var express = require("express");
var router = express.Router();
const { User } = require("../db/models/user.model");
const { verifySession } = require("../middleware/verifySession");
let _ = require('lodash');


/**
 *  POST /getProfile
 *  Purpose: Get details of the user
 */
router.post("/getProfile", (req, res) => {
    let _id = req.body._id;
    User.findById({ _id }, function (err,userData)  {
        let dataToSend = _.pick(userData, ['email', 'fullName']);
        res.status(200).send(dataToSend);
    });
});


/**
 *  POST /makeChangesToProfile
 *  Purpose: Make changes to profile details
 */
router.post("/makeChangesToProfile", (req, res) => {
    let _id = req.body._id;
    let email = req.body.email;
    let fullName = req.body.fullName;
    User.findByIdAndUpdate( _id, { email, fullName }, (err, updatedUserData) => {
        let dataToSend = _.pick(updatedUserData, ['email', 'fullName']);
        res.status(200).send(dataToSend);
    }).catch((e) => {
        res.status(401).send(e);
    });
});

module.exports = router;