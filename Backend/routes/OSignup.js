var router = require('express').Router();
var { Owners } = require('../models/owner');
var bcrypt = require('bcryptjs');

router.post('/OSignup', (req, res) => {
    console.log("Inside Owner Signup Handler");
    console.log("Inside Customer Signup Handler");
    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(req.body.password, salt);
    var owner = new Owners({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: hash
    });

    owner.save().then((user) => {
        console.log("User created : ", user);
        res.cookie('ocookie', "owner", { maxAge: 900000, httpOnly: false, path: '/' });
        //req.session.user = user;
        res.status(200).json({email : req.body.email,cookie:"owner"});
    }, (err) => {
        console.log("Error Creating User");
        console.log(err)
        res.sendStatus(400).end();
    })
})

module.exports=router