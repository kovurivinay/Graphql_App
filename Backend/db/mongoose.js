var mongoose = require('mongoose');
var configLink=require('./../config');
mongoose.Promise = global.Promise;

// mongoose.set('useCreateIndex', true);
mongoose.connect(configLink.Mongoose_Link,{ useNewUrlParser: true,useCreateIndex: true });
// mongoose.set('useCreateIndex', true);
var mdb=mongoose.connection;
mdb.on('error',console.error.bind(console,'Connection error'))
mdb.on('open',()=>{
    console.log('MongoDB connected!')
})

module.exports = {mongoose};