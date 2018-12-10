


var { Property } = require('./../models/property');
function handle_request(msg, callback){
   
    console.log("Inside book kafka backend");
    console.log(msg);
    Property.find({
    }, function (err, prop) {
        if (err) {
            callback(err, null)
        } else if (prop) {
            callback(null, prop)
        }
    })
    
    
    
    console.log("after callback");
};

exports.handle_request = handle_request;


