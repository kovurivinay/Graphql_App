var { Users } = require('./../models/user');
var { Owners } = require('./../models/owner');

function handle_request(msg, callback){
   
    console.log("Inside book kafka backend");
    console.log(msg);
    if(msg.type=='traveler'){
        Users.updateOne({
            email: msg.email
        }, { ...msg.body }, function (err, result) {
            if (err) {
                
                callback(err, null)
            }
            else if (result) {
                callback(null, result)
            }
        })
    }
    else if(msg.type=='owner'){
        Owners.updateOne({
            email: msg.email
        }, { ...msg.body }, function (err, result) {
            if (err) {
                callback(err, null)
            }
            else if (result) {
                callback(null, result)
            }
        })
    }
    
    
    console.log("after callback");
};

exports.handle_request = handle_request;