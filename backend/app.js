const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejs = require('ejs');
const Item = require('./models/items'); // your Item schema
const ejsMate = require('ejs-mate');

const app = express();

const dbUrl = 'mongodb://127.0.0.1:27017/KindLoop'; // Local MongoDB URL

// MongoDB connection
main()
  .then(() => console.log('Connection successful'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}
// Middleware
app.engine('ejs', ejsMate);  // Set ejsMate as the engine before defining view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


// Root Route
app.get('/', (req, res) => {
  res.send(' ♾️ Welcome to KindLoop!');
});

// INDEX – Show all items
app.get('/items', async (req, res) => {
  const allItems = await Item.find({});
  res.render('items/index.ejs', { allItems });
});

// NEW – Show form to add new item
app.get('/items/new', (req, res) => {
  res.render('items/new.ejs');
});

// CREATE – Add new item to DB
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body.item);
  await newItem.save();
  res.redirect('/items');
});

// SHOW – Show details of a specific item
app.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.redirect('/items');
  }
  res.render('items/show.ejs', { item });
});

// EDIT – Show form to edit an item
app.get('/items/:id/edit', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('items/edit.ejs', { item });
});



app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});