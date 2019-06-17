'use strict';

const mongoose = require('mongoose');

// db Schema
const Schema = mongoose.Schema;
  
// User Schema
const UserSchema = new Schema({
    _id: {
        //bcrypt
    },
    fullName: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports.User = User;