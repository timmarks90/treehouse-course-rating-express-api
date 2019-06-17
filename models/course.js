'use strict';

const mongoose = require('mongoose');

// db Schema
const Schema = mongoose.Schema;
  
// Course Schema
const CourseSchema = new Schema({
    _id: {
        //bcrypt
    },
    user: {
      // user collection
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    estimatedTime: {
      type: String,
    },
    materialsNeeded: {
      type: String,
    },
    steps: [
      // array
    ],
    reviews: [
      // array
    ],
});

const Course = mongoose.model("Course", CourseSchema);

module.exports.Course = Course;