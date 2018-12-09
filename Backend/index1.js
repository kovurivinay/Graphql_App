// //import the require dependencies
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var cookieParser = require('cookie-parser');
// var cors = require('cors');
// app.set('view engine', 'ejs');
// var mysql = require('mysql');
// //var pool = require('./pool');
// const multer = require('multer');
// const uuidv4 = require('uuid/v4');
// const path = require('path');
// const fs = require('fs');
// var a = "";
// var success = "Invalid creds";
// var bcrypt = require('bcryptjs');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log("Filename:" + file.fieldname)
//         const newFilename = `Owner${uuidv4()}${req.files.length}${path.extname(file.originalname)}`;
//         a += newFilename + " ";
//         cb(null, newFilename);
//     },
// });

// const upload = multer({
//     storage: storage, fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// });

// function checkFileType(file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'admin',
//     port: '3306',
//     database: 'homeaway'
// });

// db.connect((err) => {
//     if (err) {
//         console.log("rsbh")
//         throw err;
//     }
//     var sql = "select * from clogin_table";
//     console.log("Mysql connected")
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log("error")
//         }
//     })
// })

// //use cors to allow cross origin resource sharing
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// //use express session to maintain session data
// app.use(session({
//     secret: 'cmpe273_kafka_passport_mongo',
//     resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration: 5 * 60 * 1000
// }));

// //Allow Access Control
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });


// app.post('/clogin', function (req, res) {
//     var sql = "SELECT *  FROM clogin_table WHERE email = " +
//         mysql.escape(req.body.username);

//     console.log("Inside Traveler Login Post Request");

    
//             db.query(sql, function (err, result) {

//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                 } else if (result.length == 0) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                 }
//                 else {
//                     console.log(result)
//                     console.log(bcrypt.compareSync(req.body.password, result[0].password))
//                     if (bcrypt.compareSync(req.body.password, result[0].password)) {
//                         res.cookie('ccookie', "customer", { maxAge: 900000, httpOnly: false, path: '/' });
//                         //sessionStorage.setItem('email', req.body.email)
//                         req.session.user = result;
//                         console.log(result)
//                         res.writeHead(200, {
//                             'Content-Type': 'text/plain'
//                         })
//                         res.end("Successful Login");

//                     }
//                     else {
//                         console.log(" wrong pass")
//                         res.end("Invalid password")
//                     }
//                 }
//             });
        
   

// });




// //start your server on port 3001
// app.listen(3001);
// console.log("Server Listening on port 3001");