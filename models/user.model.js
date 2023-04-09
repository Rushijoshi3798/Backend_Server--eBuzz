const mongoose = require("mongoose");


//user schema
const userSchema = mongoose.Schema({
    Firstname: {type: String, required: true},
    Lastname: {type: String, required: true,unique : true},
    Email : {type: String, required: true},
    Password: {type: String, required: true},
    Type : {type: String, required: true},
},{
    versionKey:false
});


//model/template
const UserModel = mongoose.model('users',userSchema);


module.exports={
    UserModel
};

