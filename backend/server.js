const express = require("express");

const bodyParser = require('body-parser');

const HttpError = require("./schema/httpError");

const mongoose = require('mongoose');

const server = express();


const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const formDataParser = require("./middleware/parseData");

server.use(formDataParser);

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});

server.use("/users",userRoutes);
server.use("/property",propertyRoutes);
server.use("/notifications",notificationRoutes);

server.use((req,res,next)=>{
    const error = new HttpError("Page Not Found",404);
    next(error);
})

server.use((error,req,res,next)=>{
    res.status(error.code || 500);
    res.json({message : error.message || "Unknown error occur"});
})
mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@local.myy6ou9.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        server.listen(process.env.PORT||5000);
        console.log("connect to database");
}).catch((error)=>{
    console.log(error);
})