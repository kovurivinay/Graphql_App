var router = require('express').Router();
var { Owners } = require('../models/owner');
var bcrypt = require('bcryptjs');
//passport imports
var config = require('../config/settings');
var jwt = require('jsonwebtoken');
var passport = require('passport');

router.post('/ologin', function (req, res) {
    console.log("Inside Owner login handler")
    //console.log(req.body.username)
    Owners.findOne({
        email: req.body.username
    }, function (err, user) {
        if (err) {
            res.code = "400";
            res.value = "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(400).end();
        } else if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.code = "200";
                res.value = user;
                console.log(res.value);
                res.cookie('ocookie', "owner", { maxAge: 900000, httpOnly: false, path: '/' });
                res.status(200).json({email : req.body.username,cookie:"owner"});
            }
            else {
                res.code = "200";
                res.value = "Invalid password";
                console.log(res.value);
                res.end("Invalid password");
            }
        }
    })
});

module.exports=router