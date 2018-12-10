var mongoose = require('mongoose');

const propertyschema= new mongoose.Schema({
    _id : {
        type : Number
    },
    owner : {
        type : String
    },
    // email :{
    //     type : String,
    //     required:true,
    //     unique:true
        
    // },
    country : {
        type : String
    },
    street : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    zipcode : {
        type : String
    },
    headline : {
        type : String
    },
    description : {
        type : String
    },
    property_type : {
        type : String
    },
    bedrooms : {
        type : Number
    },
    accomodations : {
        type : Number
    },
    bathrooms : {
        type : Number
    },
    photos : {
        type : String
    },
    price : {
        type : String
    },
    amenities : {
        type : String
    },
    startdate : {
        type : String
    },
    enddate : {
        type : String
    },
    owner:{
        type:String
    }
    
})
var Property = mongoose.model('property',propertyschema);

module.exports = {Property};