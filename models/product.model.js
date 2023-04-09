const mongoose = require("mongoose");

//schema for product
const productSchema = mongoose.Schema({

    category: {
        type: String,
        enum: ["electronics", "men", "women", "kids", "furnitures"], // use one of these
        required: true
      },
    product: {type: String, required: true}, // if category is electronics you product could be laptop/smart TV/audio/
    title: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    discounted_price: {type: Number, required: true}, // Price after discount
    strike_price: {type: Number, required: true}, //M.R.P
    discount: {type: Number, required: true}, // if 0% means deal pirce -> price-(0*price)/100; (:- frontend work)
    inStock: {type: Boolean, required: true}, 
    images: {type: Array, required: true},// array of urls 
    size: {type: Array, required: true},// array of sizes
    rating: {type: Number, required: true}, 
    rating_count: {type: Number, required: true},
},
{versionKey:false}
);


//template/model for creating products
const ProductModel = mongoose.model("products",productSchema);


module.exports = {
    ProductModel
};

