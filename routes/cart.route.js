const express = require("express");
const jwt = require("jsonwebtoken");
//cart model
const { CartModel } = require("../models/cart.model");

const cartRoute = express.Router();

//read -> get all the cart product;
cartRoute.get("/", async (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, "key");
  console.log(decoded.userId, "from cart get route");
  console.log(req.query);
  const _id = req.query._id;
  // console.log("routes",req.headers);
  // userId:loggedInUser,...req.query
  let loggedInUser = decoded.userId;
  let queryObj = {};
  if (_id == undefined) {
    queryObj = { userId: loggedInUser };
  } else if (typeof _id === "string") {
    queryObj = { _id: _id, userId: loggedInUser };
  } else {
    if (_id.length > 0) {
      queryObj = { _id: { $in: _id }, userId: loggedInUser };
    }
  }
  // let queryObj = {_id: {$in:_id},userId:loggedInUser};
  console.log("queryObj", queryObj);
  try {
    const cartItems = await CartModel.find(queryObj);
    // console.log('fromCart routes',cartItems)
    res.status(200).send({ success: true, data: cartItems });
  } catch (err) {
    res.status(400).send({ success: false, message: err });
  }
});

//create -> add product to cart;
cartRoute.post("/add", async (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, "key");
  console.log(decoded.userId, "from cart post route");
  const {
    _id,
    title,
    brand,
    description,
    discounted_price,
    strike_price,
    discount,
    inStock,
    size,
    images,
    rating,
    rating_count,
    category,
    product,
    userId,
  } = req.body;
  try {
    const cart = new CartModel({
      title,
      brand,
      description,
      discounted_price,
      strike_price,
      discount,
      inStock,
      size,
      images,
      rating,
      rating_count,
      category,
      product,
      productId: _id,
      qtn: 1,
      userId,
    });
    const saveCart = await cart.save();
    res.status(200).send({ success: true, data: saveCart });
  } catch (err) {
    res.status(400).send({ success: false, message: err });
  }
});

//update -> update the quantity of product;
cartRoute.patch("/update/:itemId", async (req, res) => {
  // const token = req.headers?.authorization?.split(" ")[1];
  // const decoded = jwt.verify(token,"key");
  // console.log(decoded.userId,"from cart patch route");
  const LoggedInUserToken = req.headers?.authorization?.split(" ")[1]; // passing via headers for authorizatin
  const { itemId } = req.params; // cart item id
  const { qtn } = req.body; // updated quantity of cartItem
  // console.log(LoggedInUserToken);
  try {
    const decoded = jwt.verify(LoggedInUserToken, "key");
    // console.log("decoded",decoded);
    const loggedInUser_id = decoded.userId; // we was pasing {userId:_id} as payload during login check userRoute(file) -> /login
    const cartItem = await CartModel.findOne({ _id: itemId });
    console.log("cartItem", cartItem.userId);
    console.log("from token", loggedInUser_id);
    // console.log("body",req.body.userId);
    // loggedInUser_id==cartItem.userId
    if (loggedInUser_id == cartItem.userId) {
      const updatedCart = await CartModel.findByIdAndUpdate(
        { _id: itemId },
        { qtn: qtn },
        { new: true }
      );
      res.send({ success: true, data: updatedCart });
    } else {
      res
        .status(400)
        .send({
          success: false,
          message: "not authorize, please login first, from route",
        });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: err, from: "cart" });
  }
});

//delete -> delete the product;
cartRoute.delete("/delete/:itemId", async (req, res) => {
  const LoggedInUserToken = req.headers?.authorization?.split(" ")[1]; // passing via headers for authorizatin
  const { itemId } = req.params; // cart item id

  // console.log(LoggedInUserToken);
  try {
    const decoded = jwt.verify(LoggedInUserToken, "key");
    // console.log(decoded);
    const loggedInUser_id = decoded.userId; // we was pasing {userId:_id} as payload during login check userRoute(file) -> /login
    const cartItem = await CartModel.findOne({ _id: itemId });
    if (loggedInUser_id == cartItem.userId) {
      await CartModel.findByIdAndDelete({ _id: itemId });
      res.status(200).send({ success: true, message: "successfully deleted" });
    } else {
      res
        .status(400)
        .send({ success: false, message: "not authorize, please login first" });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: err, from: "cart" });
  }
});

module.exports = {
  cartRoute,
};
