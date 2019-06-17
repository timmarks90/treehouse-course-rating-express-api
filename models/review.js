'use strict';

const mongoose = require('mongoose');

// db Schema
const Schema = mongoose.Schema;
  
// Review Schema
const ReviewSchema = new Schema({
    _id: {
        //bcrypt
    },
    user: {
      // user collection
    },
    postedOn: {
        //date
    },
    rating: {
        type: Number,
        require: true
    },
    review: {
        type: String
    }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports.Review = Review;