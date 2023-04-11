const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const session = require('express-session')

//requiring user model
const { AdminModel } = require('../models/admin.model');


const adminRoute = express.Router();



//routes are below ---------///////

//Admin register -> post method
adminRoute.post("/register",async(req,res)=>{
    const {Firstname,Lastname,Email,Password,Type} = req.body;
    
    try{
        const checkExistUser = await AdminModel.findOne({Email}); //checking if admin already exist
        if(checkExistUser){
            res.status(401).send({success:false,message:"User already exist"});
        }else{
            bcrypt.hash(Password,5,async(err,hash)=>{
                if(hash){
                    const admin = new AdminModel({Firstname,Lastname,Email,Password:hash,Type});
                    await admin.save();
                    res.status(200).send({success:true,message:"Admin Registration Successful"})
                }else{
                    res.status(400).send({success:false,message:err+"errrrr2"});
                }
            });
        }
    }
    catch(err){
        res.status(400).send({success:false,message:err+"errrrr"});
    }
});

//Admin login -> post method
adminRoute.post("/login",async(req,res)=>{  
    const {Email,Password} = req.body;
    try{
        const findUser = await AdminModel.findOne({Email});
        // console.log(findUser.ObjectId._id,"objet");
        // console.log(findUser);
        if(findUser){
            bcrypt.compare(Password,findUser.Password,(err,result)=>{

               if(result){
                const token = jwt.sign({"userId":findUser._id},"key",{ expiresIn: '1h' }); //,{ expiresIn: '1h' }
                // console.log("login",findUser._id);
                // console.log(token);
                // req.session.token=token
                res.status(200).send({success:true,message:'Admin login successfull',token:token, data: findUser})
               }else{
                
                res.status(401).send({success:false,message:"wrong credentils"});
               }
            });

        }else{
            res.status(401).send({success:false,message:"wrong credentials"});
        }
    }
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});


module.exports={
    adminRoute
}

