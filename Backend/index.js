//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
var bcrypt = require('bcryptjs');
var configlink =require('./config')
//kafka
var kafka = require('./kafka/client');

// Mongoose imports and models
var { mongoose } = require('./db/mongoose');
var { Users } = require('./models/user');
var { Owners } = require('./models/owner');
var { Property } = require('./models/property');
var { counters } = require('./models/counters');

//passport imports
var config = require('./config/settings');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var passport = require('passport');

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

// Bring in defined Passport Strategy
require('./config/passport')(passport);

//GraphQL
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
//Using graphQL
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

// Log requests to console
app.use(morgan('dev'));

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cors to allow cross origin resource sharing
app.use(cors({ origin: configlink.React_Link, credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', configlink.React_Link);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var clogin = require('./routes/clogin.js');
var cSignup = require('./routes/cSignup.js');
var ologin = require('./routes/ologin.js');
var OSignup = require('./routes/OSignup.js');
var search = require('./routes/search.js');
var Bookdates = require('./routes/Bookdates.js');
var searchprop = require('./routes/searchprop.js');
var get_bookings = require('./routes/get_bookings.js');
var get_properties = require('./routes/get_properties.js');
var get_profiles = require('./routes/get_profiles.js');
var set_profiles = require('./routes/set_profiles.js');
var propertydb = require('./routes/propertydb.js');
var messages = require('./routes/messages.js');

app.use('/',clogin)
app.use('/',cSignup)
app.use('/',ologin)
app.use('/',OSignup)
app.use('/',search)
app.use('/',Bookdates)
app.use('/',searchprop)
app.use('/',get_bookings)
app.use('/',get_properties)
app.use('/',get_profiles)
app.use('/',set_profiles)
app.use('/',propertydb)
app.use('/',messages)
// $or: [
//     { 'name.first' : /^G/ },
//     { birth: { $lt: new Date('01/01/1945') } }
//   ]
app.post('/message', (req, res) => {
    kafka.make_request('post_message', req.body, (err, results) => {
        console.log("In node kf --> Post Message Handler")
        if (err) {
            console.log("Error occured")
            res.json({ status: "error", msg: "System error" })
        }
        else {
            console.log("Got results in node kf")
            res.json({
                updatedList: results
            });
            res.end();
        }
    })
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");