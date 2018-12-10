var router = require('express').Router();
//var kafka = require('../kafka/client');
var { Users } = require('./../models/user');
var { Owners } = require('./../models/owner');

router.put('/cset_profiles', function (req, res) {
    console.log("setting profile of: " + req.body.email)
    console.log("In oset profiles: " + req.body.email)
    var data={
        email:req.body.email,
        type:"traveler",
        body:req.body
    }
    console.log(data);
        Users.updateOne({
            email: data.email
        }, { ...data.body }, function (err, result) {
            if (err) {
                
                res.json({ status: "error", msg: "System error" })
            res.sendStatus(400).end();
            }
            else if (result) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                console.log(JSON.stringify(results))
                res.end(JSON.stringify(results));
            }
        })
    

    
   
    
});

router.put('/oset_profiles', function (req, res) {
    console.log("In oset profiles: " + req.body.email)
    var data={
        email:req.body.email,
        type:"owner",
        body:req.body

    }

    Owners.updateOne({
        email: data.email
    }, { ...data.body }, function (err, result) {
        if (err) {
            res.json({ status: "error", msg: "System error" })
        res.sendStatus(400).end();
        }
        else if (result) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            console.log(JSON.stringify(results))
            res.end(JSON.stringify(results));
        }
    })
});

module.exports=router