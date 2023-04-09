const express = require("express");

const orderRoute = express.Router();

//import/requiring model 
const { OrderModel } = require("../models/order.model");

//get
orderRoute.get("/",async(req,res)=>{
    try{
        const orders = await OrderModel.find();
        res.status(200).send({success:true,data:orders});
    }  
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});


//post/add orders
orderRoute.post("/add",async(req,res)=>{
    const documents = req.body;
    try{
        const data = await OrderModel.create(documents);
        res.status(200).send({success:true,data:data})
    }
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});

//delete order
orderRoute.delete("/delete/:orderId",async(req,res)=>{
    const { orderId } = req.params;
    try{
        await OrderModel.findByIdAndDelete(orderId);
        res.status(200).send({success:true,message:'deleted successfully'});
    }
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});


module.exports={
    orderRoute
}