const mongoose = require("mongoose");

//schema for order
const orderSchema = mongoose.Schema({
    title: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    discounted_price: {type: Number, required: true},
    strike_price: {type: Number, required: true},
    discount: {type: Number, required: true}, // if 0% means deal pirce -> price-(0*price)/100; (:- frontend work)
    inStock: {type: Boolean, required: true}, 
    size: {type: Array, required: true},
    images: {type: Array, required: true},// array of urls 
    rating: {type: Number, required: true},
    rating_count: {type: Number, required: true},     
    category: {
        type: String,
        enum: ["electronics", "men", "women", "kids", "furnitures"], // use one of these
        required: true
      },
    product: {type: String, required: true}, // if category is electronics you product could be laptop/smart TV/audio/
    productId: {type: String, required: true},
    qtn: {type: Number,required: true},
    userId: {type: String, required: true},
    userDetails:{
        type: Object,
        required: true,
        name:{type: String,required: true},
        contact:{type: Number,required: true},
        pincode:{type: Number,required: true},
        address:{type: String,required: true},
    }
},
{versionKey:false}
);


//template/model for creating order
const OrderModel = mongoose.model("order",orderSchema);


module.exports = {
    OrderModel
};

