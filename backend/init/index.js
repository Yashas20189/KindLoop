const mongoose = require('mongoose'); // Import mongoose
const initData = require("./data.js"); // Import sample item data
const Item = require("../models/items.js"); 

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/KindLoop');
}

// Seed function to initialize the DB with item data
const initDB = async () => {
  await Item.deleteMany({}); // Remove existing items
  await Item.insertMany(initData.data); // Insert items
  console.log("Item data was initialized");
};

initDB();
