var router = require('express').Router();
var { Property } = require('../models/property');

router.post('/get_properties', function (req, res) {
    console.log("Inside Get Properties API")
    console.log(req.body.name)
    Property.find({
        owner: req.body.name
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
                console.log("Properties: " + JSON.stringify(result))
                res.end(JSON.stringify(result));
        }
    })
    
});

module.exports=router