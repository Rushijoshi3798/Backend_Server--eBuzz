const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const session = require('express-session')

//requiring user model
const { UserModel } = require('../models/user.model');


const userRoute = express.Router();



//routes are below ---------///////

//register -> post method
userRoute.post("/register",async(req,res)=>{
    const {Firstname,Lastname,Email,Password,Type} = req.body;
    
    try{
        const checkExistUser = await UserModel.findOne({Email}); //checking if user already exist
        if(checkExistUser){
            res.status(401).send({success:false,message:"User already exist"});
        }else{
            bcrypt.hash(Password,5,async(err,hash)=>{
                if(hash){
                    const user = new UserModel({Firstname,Lastname,Email,Password:hash,Type});
                    await user.save();
                    res.status(200).send({success:true,message:"Registration Successful"})
                }else{
                    res.status(400).send({success:false,message:err});
                }
            });
        }
    }
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});

//login -> post method
userRoute.post("/login",async(req,res)=>{
    const {Email,Password} = req.body;
    try{
        const findUser = await UserModel.findOne({Email});
        // console.log(findUser.ObjectId._id,"objet");
        // console.log(findUser);
        if(findUser){
            bcrypt.compare(Password,findUser.Password,(err,result)=>{

               if(result){
                const token = jwt.sign({"userId":findUser._id},"key",{ expiresIn: '1h' }); //,{ expiresIn: '1h' }
                // console.log("login",findUser._id);
                // console.log(token);
                // req.session.token=token
                res.status(200).send({success:true,message:'login successfull',token:token, data: findUser})
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
    userRoute
}

