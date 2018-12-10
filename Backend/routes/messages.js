var router = require('express').Router();
var { messages } = require('../models/messages');

router.post('/messages', function (req, res) {
    console.log("Inside Message Post Request");
    //console.log(req.body.username)
    var message = new messages({
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
    });

    message.save().then((message) => {
        console.log("message created : ", message);
        res.status(200).json(JSON.stringify(message));
    }, (err) => {
        console.log("Error Creating message");
        console.log(err)
        res.sendStatus(400).end();
    })

});

router.post('/get_messages', function (req, res) {
    console.log("Inside Get messages Request");
    console.log(req.body)
    messages.find({
        to: req.body.to
    }, function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(400).end();
        } else if (result) {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            console.log("Messages: " + JSON.stringify(result))
            res.end(JSON.stringify(result));

        }
    })
});

module.exports = router
