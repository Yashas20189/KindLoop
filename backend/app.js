if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const multer = require("multer");
const flash = require("connect-flash");

const Item = require("./models/items"); // Your Item schema
const User = require("./models/user");  // Your User schema
const cloudConfig = require("./cloudConfig"); // Cloudinary config
const { cloudinary, storage } = cloudConfig;
const upload = multer({ storage });
const app = express();

const axios = require("axios");

async function reverseGeocode(lat, lng) {
  const apiKey = process.env.GEOCODER_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const address = response.data.results[0].formatted;
    return address;
  } catch (err) {
    console.error('Reverse geocode failed:', err.message);
    return null;
  }
}

// ✅ MongoDB connection
const dbUrl = "mongodb://127.0.0.1:27017/KindLoop";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Session configuration
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// ✅ Middleware Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


// ✅ Session middleware MUST come before flash and passport
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// ✅ Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Flash and current user middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Root Route
app.get("/", (req, res) => {
  res.send("♾️ Welcome to KindLoop!");
});

// INDEX – Show all items
app.get("/items", async (req, res) => {
  const allItems = await Item.find({});
  res.render("items/index.ejs", { allItems });
});

// NEW – Form to add new item
app.get("/items/new", (req, res) => {
  res.render("items/new.ejs");
});

// CREATE – Add new item to DB
app.post("/items", upload.single("item[image]"), async (req, res) => {
  if (!req.file) {
    req.flash("error", "No image uploaded.");
    return res.redirect("/items/new");
  }

  const newItem = new Item(req.body.item);
  newItem.image = {
    url: req.file.path,
    filename: req.file.filename,
  };
  await newItem.save();
  req.flash("success", "Item added successfully!");
  res.redirect("/items");
});

// SHOW – Details of one item
app.get("/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    req.flash("error", "Item not found.");
    return res.redirect("/items");
  }
  res.render("items/show.ejs", { item });
});

// EDIT – Show form to edit
app.get("/items/:id/edit", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    req.flash("error", "Item not found.");
    return res.redirect("/items");
  }
  res.render("items/edit.ejs", { item });
});

// UPDATE – Update in DB
app.put("/items/:id", upload.single("item[image]"), async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { ...req.body.item });

  if (req.file) {
    item.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await item.save();
  }

  req.flash("success", "Item updated!");
  res.redirect(`/items/${item._id}`);
});

// DELETE – Remove from DB
app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  req.flash("success", "Item deleted.");
  res.redirect("/items");
});

// SIGNUP – Form
app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// SIGNUP – Logic
app.post("/signup", async (req, res, next) => {
  let { username, email, password } = req.body;
  const newUser = new User({ username, email });
  const registeredUser = await User.register(newUser, password);
  console.log(registeredUser);
  res.redirect("/items");
});

// DEMO USER – Create a demo user
app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "student@gmail.com",
    username: "delta-student",
  });

  let registeredUser = await User.register(fakeUser, "helloworld");
  res.send(registeredUser);
});


// LOGIN – Form
app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// LOGIN – Logic
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/items");
  }
);

// LOGOUT
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully.");
    res.redirect("/");
  });
});

// PROTECTED Route
app.get("/protected", (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  res.send("You are logged in and can view this page!");
});

// Location Route
app.get('/location', (req, res) => {
  res.render('users/location.ejs'); // Adjust path if needed
});

// Save location and reverse geocode
app.post('/location', async (req, res) => {
  const { latitude, longitude, itemId } = req.body;

  try {
    const address = await reverseGeocode(latitude, longitude);

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        location: {
          latitude,
          longitude,
          address
        }
      },
      { new: true }
    );

    res.json({ success: true, address, item: updatedItem });
  } catch (err) {
    console.error("Error saving location:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// Start server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
