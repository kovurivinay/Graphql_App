var router = require('express').Router();
var { Users } = require('../models/user');
var bcrypt = require('bcryptjs');


router.post('/cSignup', (req, res) => {
    console.log("Inside Customer Signup Handler");
    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(req.body.password, salt);
    var user = new Users({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: hash
    });

    user.save().then((user) => {
        console.log("User created : ", user);
        res.cookie('ccookie', "customer", { maxAge: 900000, httpOnly: false, path: '/' });
        //req.session.user = user;
        res.status(200).json({email : req.body.email,cookie:"customer"});
    }, (err) => {
        console.log("Error Creating User");
        console.log(err)
        res.sendStatus(400).end();
    })
})

module.exports=router