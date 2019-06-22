'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
// Course Schema
const CourseSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
      _id: Schema.Types.ObjectId,
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