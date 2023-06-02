
const jwt = require("jsonwebtoken")

const authorise = (req, res, next) => {
    // console.log("middleware",req.headers.authorization);
    const token = req.headers?.authorization?.split(" ")[1];
    console.log("token", token);
    // const sessionToken = req.session.token;
    // console.log("sessionToken from middleware",sessionToken);
    // console.log(token);
    if (token) {
        try {
            const decoded = jwt.verify(token, "key");
            console.log(decoded.userId, "from middleware");
            req.body.userId = decoded.userId;
            console.log("next is next");
            next();
            console.log("next was done");
        }
        catch (err) {
            res.status(401).send({ success: false, message: 'not authorise,please login first decoded' });
        }
        // console.log(token);
        // if(decoded){
        //     // if(req.method=="GET"){
        //     //     next();
        //     // }else{
        //     //     req.body.userId = decoded.userId;
        //     //     next();
        //     // }
        //     req.body.userId = decoded.userId;
        //     next();
        // }else{
        //     res.status(401).send({success:false,message:"Please Login first"});
        // }
    }
    else {
        res.status(401).send({ success: false, mesage: "You are not authorize please login, error in token" });
    }
}


module.exports = {
    authorise
}

