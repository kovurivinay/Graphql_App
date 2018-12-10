var { Users } = require('./../models/user');
var { Owners } = require('./../models/owner');

function handle_request(msg, callback){
   
    console.log("Inside book kafka backend");
    console.log(msg);
    if(msg.type=='traveler'){
        Users.findOne({
            email: msg.email
        }, function (err, result) {
            if (err) {
                callback(err, null)
            } else if (result) {
                //delete result.password;
                callback(null, result)
            }
        })
    }
    else if(msg.type=='owner'){
        Owners.findOne({
            email: msg.email
        }, function (err, result) {
            if (err) {
                callback(err, null)
            } else if (result) {
                //delete result.password;
                callback(null, result)
            }
        })
    }
    
    
    console.log("after callback");
};

exports.handle_request = handle_request;