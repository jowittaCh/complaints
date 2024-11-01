const mongoose =require("mongoose");
const express = require("express");
let app = express();
let bodyParser =require("body-parser");   
require('dotenv').config();

const userRoutes = require("./src/users/userRoutes");
  const complaintRoutes = require("./src/complaints/complaintRoutes");
  const categoryRoutes = require("./src/categories/categoryRoutes");

mongoose.connect("mongodb://localhost:27017/complaints")
.then(()=>{
    console.log("connected");
})
.catch(
    (err)=>{
        console.log("error //");
        console.log(err);
    }
);

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());                                 

app.use("/user",userRoutes);
 app.use("/complaint",complaintRoutes);
 app.use("/category",categoryRoutes); 

app.use("*",(req,res)=>{
    res.status(400).json({
        message:"path not found"
    });
});

app.listen(process.env.PORT , ()=>{
    console.log(`listening on port ${process.env.PORT}`);

});
