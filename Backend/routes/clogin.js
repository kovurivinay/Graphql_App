var router = require('express').Router();
var { Users } = require('../models/user');
var bcrypt = require('bcryptjs');
//passport imports
var config = require('../config/settings');
var jwt = require('jsonwebtoken');
var passport = require('passport');

router.post('/clogin', function (req, res) {
    console.log("Inside Traveler Login Post Request");
    //console.log(req.body.username)
    Users.findOne({
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
                // Create token if the password matched and no error was thrown
                var token = jwt.sign({ user }, config.secret, {
                    expiresIn: 10080 // in seconds
                });
                console.log(token + "Inside token")
                res.cookie('ccookie', "customer", { maxAge: 900000, httpOnly: false, path: '/' });

                res.status(200).json({ success: true, token: 'JWT ' + token ,email : req.body.username, cookie:"customer"});
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
