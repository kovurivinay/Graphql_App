var router = require('express').Router();
var { Property } = require('../models/property');
var { counters } = require('../models/counters');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const path = require('path');
const fs = require('fs');
var a = "";
//var success = "Invalid creds";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        console.log("Filename:" + file.fieldname)
        const newFilename = `Owner${uuidv4()}${req.files.length}${path.extname(file.originalname)}`;
        a += newFilename + " ";
        cb(null, newFilename);
    },
});

const upload = multer({
    storage: storage, fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
router.post('/dbpictures', upload.array('selectedFile', 5), (req, res) => {
    console.log("Req : ", req.files);
    console.log("Req-body : ", req.body);
    console.log("Inside dbpictures: " + a)
    // console.log("Res : ",res.file);npm insat
    res.send();
});



router.post('/download', (req, res) => {
    console.log("Inside download file");
    var temp = req.body.photos;
    if (temp != "") {
        var file1 = temp.trim().split(" ")
        console.log("Length:" + file1.length + " photos: " + file1)
        var base64img = [];
        file1.forEach(element => {
            var fileLocation = path.join(__dirname + '/../uploads', element);
            var img = fs.readFileSync(fileLocation);
            base64img.push(new Buffer(img).toString('base64'));
        })
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(JSON.stringify(base64img));
    }
    else {
        //res.writeHead(400);
        res.end();
    }
});


router.post('/propertydb', async (req, res) => {
    console.log("Inside property Post Request");
    console.log(req.body)
    b = a;
    a = "";
    console.log(b)
    //sequence_value = 0
    await counters.findOne({
        _id: "propertyid"
    }, function (err, counter) {
        if (err) {
            console.log(res.value);
            //res.sendStatus(400).end();
        } else if (counter) {
            counter.sequence_value += 1;
            sequence_value = counter.sequence_value
            console.log(counter.sequence_value);
            counter.save();
        }
        console.log("here" + sequence_value);
    })
    var property = new Property({
        _id: sequence_value,
        owner: req.body.owner,
        country: req.body.country,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        headline: req.body.headline,
        description: req.body.description,
        property_type: req.body.property_type,
        bedrooms: req.body.bedrooms,
        accomodations: req.body.accomodations,
        bathrooms: req.body.bathrooms,
        photos: b,
        price: req.body.price,
        amenities: req.body.amenities,
        startdate: req.body.startdate,
        enddate: req.body.enddate,

        owner: req.body.owner,
        Customer_name:"",
        Booked_dates:""
    });
    property.save().then((user) => {
        console.log("Property added : ", user);
        res.sendStatus(200).end();
        //req.session.user = user;
    }, (err) => {
        console.log("Error Creating User");
        console.log(err)
        res.sendStatus(400).end();
    })

});

module.exports=router