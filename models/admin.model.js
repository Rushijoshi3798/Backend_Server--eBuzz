const mongoose = require("mongoose");


//user schema
const adminSchema = mongoose.Schema({
    Firstname: {type: String, required: true},
    Lastname: {type: String, required: true,unique : true},
    Email : {type: String, required: true},
    Password: {type: String, required: true},
    Type : {type: String, required: true},
},{
    versionKey:false
});


//model/template
const AdminModel = mongoose.model('admins',adminSchema);


module.exports={
    AdminModel
};