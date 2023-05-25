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
    inStock,
    size,
    rating,
    rating_count,
  } = req.body;

  try {
    const AddProduct = new ProductModel({
      category,
      product,
      title,
      images,
      brand,
      strike_price,
      discounted_price,
      discount,
      inStock,
      description,
      size,
      rating_count,
      rating,
    });
    console.log("Addproduct", AddProduct);
    const saveProduct = await AddProduct.save();
    res.status(200).send({
      success: true,
      message: "posted successfully",
      data: saveProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, message: "adfaff", err });
  }
});

productRoute.get("/", async (req, res) => {
  console.log("products");
  console.log("called");

  const query = req.query;
  console.log("query", query);

  const { sort, order } = req.query;

  if (sort && order) {
    const sortOption = sort ? { discounted_price: sort === 'asc' ? 1 : -1 } : {};

    try {
      const products = await ProductModel.find().sort(sortOption);
      res.status(200).send({
        TotalCount: products.length,
        products,
      });
    } catch (error) {
      res.status(400).send({ msg: "Something went wrong!" });
    }
  } else {
    // const {sort} = req.query
    try {
      // const sortOption = sort ? { price: sort === 'asc' ? 1 : -1 } : {};
      const products = await ProductModel.find(query);
      res.status(200).send({
        TotalCount: products.length,
        products,
      });
    } catch (error) {
      res.status(400).send({ msg: "Something went wrong! " });
    }
  }
});

productRoute.get("/:id", async (req, res) => {
  console.log("products");
  console.log("called");
  const id = req.params.id;
  // const {sort} = req.query
  try {
    // const sortOption =    sort ? { price: sort === 'asc' ? 1 : -1 } : {};
    const products = await ProductModel.findOne({ _id: id });
    res.status(200).send({
      TotalCount: products.length,
      products,
    });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong! " });
  }
});

productRoute.patch("/update/:id", async (req, res) => {
  const productId = req.params.id;
  const payload = req.body;

  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(
      productId,
      payload
    );

    if (!updateProduct) {
      res.status(400).send({ error: "Product not found" });
    }

    const sendUpdatedProduct = await updateProduct.save();
    res.status(200).send({ msg: "Product Successfully Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went Wrong" });
  }
});

productRoute.delete("/delete/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deleteProduct) {
      res.status(400).send({ error: "Product not Deleted" });
    }
    res.status(200).send({ msg: "Product Successfully Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went Wrong" });
  }
});

module.exports = {
  productRoute,
};
