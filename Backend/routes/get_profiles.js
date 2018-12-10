var router = require('express').Router();
var kafka = require('../kafka/client');
//passport imports
var config = require('../config/settings');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });
var { Users } = require('./../models/user');
var { Owners } = require('./../models/owner');

router.get('/cget_profiles/:email', function (req, res) {
    console.log("In get profiles: " + req.params.email)
    var msg={
        email:req.params.email,
        type:"traveler"
    }
    Users.findOne({
        email: msg.email
    }, function (err, result) {
        if (err) {
            res.json({ status: "error", msg: "System error" })
            res.sendStatus(400).end();
        } else if (result) {
            //delete result.password;
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })
    
});

router.get('/oget_profiles/:email', function (req, res) {
    console.log("In get profiles: " + req.params.email)
    console.log(req.params)
    var msg={
        email:req.params.email,
        type:"owner"
    }
    Owners.findOne({
        email: msg.email
    }, function (err, result) {
        if (err) {
            callback(err, null)
        } else if (result) {
            //delete result.password;
            callback(null, result)
        }
    })
   
});


module.exports=router