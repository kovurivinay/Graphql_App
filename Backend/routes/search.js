var router = require('express').Router();
var kafka = require('../kafka/client');

router.post('/search', function (req, res) {
    console.log("Searching for properties")
    kafka.make_request('search1', req.body, (err, results) => {
        console.log("In node kf --> Post Message Handler")
        if (err) {
            console.log("Error occured")
            res.json({ status: "error", msg: "System error" })
            res.sendStatus(400).end();
        }
        else {
            console.log("Got results in node kf")
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })

});

module.exports=router