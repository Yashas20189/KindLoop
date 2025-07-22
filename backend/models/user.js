const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isStudent: {
    type: Boolean,
    default: false,
  },

  department: {
    type: String,
  },

  karmaPoints: {
    type: Number,
    default: 0,
  },

  badges: [
    {
      type: String, // e.g., "Helper", "Connector", etc.
    },
  ],
  
});

module.exports = mongoose.model("User", userSchema);
