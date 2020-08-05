var express = require('express');
var router = express.Router();
const _ = require('lodash');
const { Course } = require('../db/models/course.model');

/**
 *  GET /home
 *  Purpose: Get all courses data for homepage
 */
router.get('/home', (req, res) => {
    Course.find({}, (err, courseData) => {
        if (!err) {
            var data = _.map(courseData, _.partialRight(_.pick,
                ['courseParamsPath', 'courseName', "description", "thumbnailPath" ]));
            res.status(200).send(data);
        }
    }).catch((e) => {
        res.status(400).send(e);
    });
});


// just a temperorary method to create course
router.post('/home/createCourse', (req, res) => {
    let course = new Course(req.body);
    course.save().then(() => {
        res.status(200).send('Course created successfully');
    }).catch((e) => {
        res.status(400).send(e);
    });
});

module.exports = router;