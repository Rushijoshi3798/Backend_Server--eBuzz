const express = require("express");
require("dotenv").config();
const cors = require("cors")
// const session = require("express-session");

//require files below
const { connection } = require('./connection');

const { productRoute } = require("./routes/product.route");
const { userRoute } = require("./routes/user.route");
const { cartRoute } = require("./routes/cart.route");
const { orderRoute } = require("./routes/order.route");
const { adminRoute} = require("./routes/admin.route");
//middleware to authorize user
const { authorise } = require("./middlewares/authenticationeMiddleware");

const app = express();



//starting below
app.use(express.json());
app.use(cors());
//configaring session middlware
// app.use(session({
//     secret:"key",
//     resave:false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));

app.get("/", (req,res) => {
    res.send("HOME PAGE");
})

app.use("/user",userRoute);
app.use("/admin", adminRoute);
app.use(authorise);
app.use("/products",productRoute);
app.use("/cart",cartRoute);
app.use("/order",orderRoute);





app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to database");
    }
    catch(err){
        console.log("not connected to database");
    }
    console.log(`running on port ${process.env.port}`);
});

