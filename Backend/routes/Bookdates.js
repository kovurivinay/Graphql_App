var router = require('express').Router();
//var kafka = require('../kafka/client');
var { Property } = require('../models/property');

router.post('/Bookdates', function (req, res) {
    console.log("Inside inserting booking dates.")
    var temp = ""
    for (var i = 0; i < req.body.dates.length; i++) {
        temp += req.body.dates[i] + " "
    }
    //console.log(temp)
    Property.updateOne({
        _id: req.body.ID
    }, {Customer_name:req.body.customer_name,Booked_dates:temp}, function (err, result) {
        if (err) {
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log(result)
            res.sendStatus(200).end();
        }
    })
});

module.exports=router