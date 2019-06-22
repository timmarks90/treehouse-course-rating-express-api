'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// db Schema
const Schema = mongoose.Schema;

//email regex validation
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
// User Schema
const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    fullName: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true,
      unqiue: true,
      validate: (value) => {
        return validator.isEmail(value);
      }
    },
    password: {
      type: String,
      required: true
    }
});

// authenticate input against db
UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email: email }).exec((err, user) => {
      if (err) {
        return callback(err);
      } else if ( !user ) {
        const err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, (error, result) => {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
};

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