const mongoose  = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseParamsPath: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        //required: true,
        minlength: 1,
        trim: true
    },
    lastUpdated: {
        type: Date,
        //required: true,
        minlength: 1,
        trim: true
    },
    whatYouWillLearn: {
        type: Array,
        trim: true
    },
    requirements: {
        type: Array,
        trim: true
    },
    description: {
        type: String,
        minlength: 1,
        trim: true
    },
    thumbnailPath: {
        type: String,
        minlength: 1,
        trim: true
    },
    content: [{
        chapterName: {
            type: String,
            minlength: 1,
            trim: true
        },
        videos: [{
            videoTitle: {
                type: String,
                //required: true,
                minlength: 1,
                trim: true
            },
            videoUrl: {
                type: String,
                //required: true,
                minlength: 1,
                trim: true
            }
        }] 
    }],
    reviews: [{
        userId: {
            type: mongoose.Types.ObjectId,
            minlength: 1,
            trim: true
        },
        rating: {
            type: Number,
        },
        comment: {
            type: String,
            minlength: 1,
            trim: true
        }
    }],
    tags: {
        type: Array,
        trim: true
    }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = { Course };
