const errorMessages = require("../../error");
const jwt = require("jsonwebtoken");
const { Request, Response } =require('express');
const bcrypt = require("bcryptjs");
const categoryModel  =require("./categoryModel");
const userModel =require("../users/userModel");
require('dotenv').config(); 
const validator =require("validator");
const moment =require("moment");

const findUserFromToken = async (req) => { 
    const authHeader = req.headers["authorization"]; //authHeader : This object contains all the headers sent in the HTTP request. Each header is a key-value pair.
    //
if(!authHeader){
   throw new Error("Authorization header is missing");
}
const token =  authHeader.split(" ")[1];
if (!token) {
   throw new Error("Token is missing");
}

   const key =process.env.SECRET_KEY;
   console.log(key);
   const decoded = jwt.verify(token, key);
   console.log(decoded);
   const userId = decoded.id;
   console.log(userId);
 
   return userId;


 };

 const categoriesList =async(req)=>{
    const verify = await findUserFromToken(req);
    const user = await userModel.findOne({ _id: verify });
    
            if (!user) {
                const error= new Error(errorMessages.invalid.message);
            error.statusCode = errorMessages.invalid.statusCode;
            throw error;
            }
    
            else{
  const availableCategories = await categoryModel.find(
     { user_id: verify }).select('_id categorieName')
  .exec();
 return availableCategories ;
            }
        };


 const  AddCategory = async (req) => { 
    const verify = await findUserFromToken(req);
    const user = await userModel.findOne({ _id: verify });
    
            if (!user) {
                const error= new Error(errorMessages.invalid.message);
            error.statusCode = errorMessages.invalid.statusCode;
            throw error;
            }
    
            else{
                const { categorieName, description } = req.body;
                const categoryExists = await categoryModel.findOne({
                    categorieName: categorieName, // Match by category name
                    user_id: verify                // and the user's ID
                  });
                  if (categoryExists) {
                    return { success: false, message: "Category already exists for this user." }; // Category exists
                  }
                
                 
                  const newCategory = new categoryModel({
                    categorieName,
                    description,
                    user_id: verify
                });

                  
                 const result = await newCategory.save();

        if (result) {
            return { success: true, message: "Category added successfully.", categoryId: result._id };
        } else {
            return { success: false, message: "Failed to add category." };
        }
                }
            
        
 };
                   
 module.exports ={
    categoriesList  ,
    AddCategory
    
 }