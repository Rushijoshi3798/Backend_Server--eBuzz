const mongoose = require("mongoose");

//schema for cart
const cartSchema = mongoose.Schema({
    title: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    discounted_price: {type: Number, required: true},
    strike_price: {type: Number, required: true}, //M.R.P
    discount: {type: Number, required: true}, // if 0% means deal pirce -> price-(0*price)/100; (:- frontend work)
    inStock: {type: Boolean, required: true}, 
    size: {type: Array, required: true},// array of sizes
    images: {type: Array, required: true},// array of urls 
    rating: {type: Number, required: true}, 
    rating_count: {type: Number, required: true},
    category: {
        type: String,
        enum: ["electronics", "men", "women", "kids", "furnitures"], // use one of these
        required: true
      },
    product: {type: String, required: true}, // if category is electronics you product could be smart TV/laptop/audio/
    productId: {type: String, required: true},
    qtn: {type: Number,required: true},
    userId: {type: String, required: true}
},
{versionKey:false}
);


//template/model for creating products
const CartModel = mongoose.model("cart",cartSchema);


module.exports = {
    CartModel
};

