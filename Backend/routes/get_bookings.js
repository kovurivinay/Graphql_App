var router = require('express').Router();
var kafka = require('../kafka/client');
var { Property } = require('../models/property');

router.post('/get_bookings', function (req, res) {
    console.log("Inside Get Bookings API")
    console.log(req.body.name)
    Property.find({
        Customer_name: req.body.name
    }, function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "Couldn't get bookings";
            console.log(res.value);
            res.sendStatus(400).end();
        } else if (result) {
            res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                console.log("Bookings: " + JSON.stringify(result))
                res.end(JSON.stringify(result));
        }
    })

});

module.exports=router