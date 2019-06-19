'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;

// *** USER ROUTES *** //

//GET /api/users
router.get('/users', (req, res, next) => {
    // return currently authenticated user
    res.status(200);
    res.json({response: "You sent me a GET request"});
});

//POST /api/users
router.post('/users', (req, res, next) => {
    // Creates a user, sets the Location header to "/", and returns no content
    User.create(userData, (error, user) => {
        if (error) {
            error.status = 400;
            return next(error);
        } else {
            res.status(201);
            res.set("Location", "/");
            return res.end();
        }
    })
});

// *** COURSE ROUTES *** //

//GET /api/courses
router.get('/courses', (req, res, next) => {
    // Returns the Course "_id" and "title" properties
    Course.find({}, {title: true}, (err, courses) => {
        if(err) {
            return next(err);
        } else {
            res.json({
                response: "Hey courses",
                courseId: req.params.id,
                title: req.params.title
            });        
        }
    })
});

// GET /api/course/:courseId
router.get('/courses/:courseId', (req, res, next) => {
    // Returns all Course properties and related documents for the provided course ID
    Course.findById(req.params.courseId, (err, courses) => {
        if(err) {
            return next(err);
        } else {
            res.status(200);
            res.json(courses);        
            return res.end();
        }
    })
});

//POST /api/courses
router.post('/users', (req, res, next) => {
    // Creates a course, sets the Location header, and returns no content
    Course.create(userData, (error, user) => {
        if (error) {
            error.status = 400;
            return next(error);
        } else {
            res.status(201);
            res.set("Location", "/");
            return res.end();
        }
    })
});

module.exports = router;