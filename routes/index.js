const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Review = require('../models/review');
const userAuth = require('../middleware').authenticateUser;

// *** USER ROUTES *** //

//GET /api/users
router.get('/users', userAuth, (req, res, next) => {
    // Returns the currently authenticated user
    res.json(req.currentUser);
});

//POST /api/users
router.post('/users', (req, res, next) => {
    // Creates a user, sets the Location header to "/", and returns no content
    User.create(req.body, (err, user) => {
        if (err) {
            err.status = 400;
            return next(err);
        } else {
            res.status(201);
            res.location("/");
            res.json({
                response: "post request",
                body: req.body
            });
        }
    });
});

// *** COURSE ROUTES *** //

//GET /api/courses
router.get('/courses', (req, res, next) => {
    // Returns the Course "_id" and "title" properties
    Course.find({}, {title: true}, (err, courses) => {
        if(err) {
            return next(err);
        } else {
            res.json(courses);        
        }
    });
});

// GET /api/course/:courseId
router.get('/courses/:courseId', (req, res, next) => {
    // Returns all Course properties and related documents for the provided course ID
    Course.findById(req.params.courseId)
        // return fullName of the related user on the course model and each review returned with the course model.
        .populate({
            path: "user",
            select: "fullName",
            model: "User"
        })
        .populate("reviews")
        .exec((err, course) => { 
    if (err) {
        return next(err);
    } else {
        res.status(200);
        res.json(course);
    }
  });
});

//POST /api/courses
router.post('/courses', userAuth, (req, res, next) => {
    // Creates a course, sets the Location header, and returns no content
    const course = new Course(req.body);
    course.save(err => {
        if(err) {
            err.status = 400;
            return next(err);
        } else {
            res.location('/');
            res.status(201);
            res.end();
        }
    });
});

//PUT /api/courses/:courseId
router.put('/courses/:courseId', userAuth, (req, res, next) => {
    // Updates a course and returns no content
    Course.findById(req.params.courseId)
        .update(req.body)
        .exec((err, course) => {
            if(err) {
                err.status = 400;
                return next(err);
            } else {
                res.status = 204; // 204 code = returns no content
                res.end();
            }
    });
});

//POST /api/courses/:courseId/reviews
router.post('/courses/:courseId/reviews', userAuth, (req, res, next) => {
    // Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
    Course.create(userData, (error, user) => {
        if (error) {
            error.status = 400;
            return next(error);
        } else {
            res.status(201);
            res.set("Location", "/");
        }
    });
});

module.exports = router;