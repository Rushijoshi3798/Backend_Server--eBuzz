const mongoose = require('mongoose');
require("dotenv").config();


//making connection with database -> mongoDb
const connection = mongoose.connect(process.env.mongo);


module.exports={
    connection
};

