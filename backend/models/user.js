const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username:{
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
      type: String,
    },
  ],
});

// Let passport-local-mongoose manage password + use email as the login field
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", userSchema);
