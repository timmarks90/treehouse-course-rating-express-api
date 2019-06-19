'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Hash password before saving to db
UserSchema.pre('save', (next) => {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})

const User = mongoose.model("User", UserSchema);
module.exports.User = User;