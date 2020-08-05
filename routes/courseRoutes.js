var express = require('express');
var router = express.Router();
const _ = require('lodash');
const { Course } = require('../db/models/course.model');

/**
 *  GET /course/courseParamsPath
 *  Purpose: Get all the data of a particular course 
 */
router.get('/course/:courseParamsPath', (req, res) => {
    Course.findOne({
        'courseParamsPath': req.params.courseParamsPath
    }, (err, courseData) => {
            if (!err) {
                res.status(200).send(courseData);
            }
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get('/course/:courseParamsPath/videos', (req, res) => {
    Course.findOne({
        'courseParamsPath': req.params.courseParamsPath
    }, (err, courseData) => {
            if (!err) {
                let videoData = _.pick(courseData, ['courseName','courseParamsPath','content']);
                res.status(200).send(videoData);
            }
    }).catch((e) => {
        res.status(400).send(e);
    });
});

module.exports = router;
 