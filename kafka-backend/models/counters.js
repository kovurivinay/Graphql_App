var mongoose = require('mongoose');

const counterschema= new mongoose.Schema({
    _id : {
        type : String
    },
    sequence_value : {
        type : Number
    },

    
})
var counters = mongoose.model('counters',counterschema);

//Users.createIndexes({username:1},{unique:true},)

module.exports = {counters};