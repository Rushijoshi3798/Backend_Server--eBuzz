const express = require("express");
const jwt = require("jsonwebtoken");

//import/requiring files below
const { ProductModel } = require("../models/product.model"); // Product model/template

////->>> making product main productRouter variable here and calling Router method of express;
const productRoute = express.Router();

//routes starting -------------------//////////////////////////////////

//create -> post product -> admin operations
productRoute.post("/add", async (req, res) => {
  const {
    category,
    product,
    title,
    images,
    brand,
    strike_price,
    discounted_price,
    discount,
    description,
    size,
  } = req.body;

  try {
    const AddProduct = new ProductModel({
      category,
      product,
      title,
      images: images.split(" "),
      brand,
      strike_price: +strike_price,
      discounted_price: +discounted_price,
      discount: +discount,
      inStock: true,
      description,
      size: size.split(" "),
      rating: Math.floor(Math.random() * 5) + 1,
      rating_count: Math.floor(Math.random() * 50) + 5,
    });
    console.log("Addproduct",AddProduct);
    const saveProduct = await AddProduct.save();
    res.status(200).send({
      success: true,
      message: "posted successfully",
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).send({ success: false, message: "adfaff",err });
  }
});

productRoute.get("/", async (req, res) => {
  console.log("products");
  console.log("called");

  const query = req.query;
  console.log("query", query);
  // const {sort} = req.query
  try {
    // const sortOption =    sort ? { price: sort === 'asc' ? 1 : -1 } : {};
    const products = await ProductModel.find(query);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong! " });
  }
});

module.exports = {
  productRoute,
};
