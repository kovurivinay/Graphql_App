var mongoose = require('mongoose');

const userschema= new mongoose.Schema({
    first : {
        type : String
    },
    last : {
        type : String
    },
    email :{
        type : String,
        required:true,
        unique:true
        
    },
    password : {
        type : String
    },
    aboutme : {
        type : String
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    company : {
        type : String
    },
    school : {
        type : String
    },
    homtown : {
        type : String
    },
    languages : {
        type : String
    },
    gender : {
        type : String
    }
    
})
var Users = mongoose.model('Users',userschema);

//Users.createIndexes({username:1},{unique:true},)

module.exports = {Users};