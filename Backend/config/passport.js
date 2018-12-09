'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var mdb = require('../db/mongoose');
var { Users } = require('../models/user');
var config = require('./settings');
console.log("In passport file");

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    };
    //console.log(opts.jwtFromRequest)
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log("In passport use:")
        console.log(jwt_payload)
        Users.findOne({
            email: jwt_payload.user.email
        }, function (err, user) {
            if (err) {
                return callback(err, false);
            } else {
                console.log("Got")
                delete user.password;
                callback(null, user);
            }
        })
    }));
};