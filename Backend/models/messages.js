var mongoose = require('mongoose');

const messageschema= new mongoose.Schema({
    from : {
        type : String
    },
    to : {
        type : String
    },
    message : {
        type : String
    },
})
var messages = mongoose.model('messages',messageschema);

//Users.createIndexes({username:1},{unique:true},)

module.exports = {messages};