const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  country: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['give', 'lend', 'request'],
    required: true
  },
});

module.exports = mongoose.model('Item', itemSchema);
