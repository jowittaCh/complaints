const errorMessages = require("../../error");
const jwt = require("jsonwebtoken");
const { Request, Response } =require('express');
const bcrypt = require("bcryptjs");
const complaintModel  =require("./complaintModel");
const userModel =require("../users/userModel");
const categorieModel=require("../categories/categoryModel");
require('dotenv').config(); 
const validator =require("validator");
const moment =require("moment");
const mongoose =require("mongoose");

const findUserFromToken = async (req) => { 
    const authHeader = req.headers["authorization"]; //authHeader : This object contains all the headers sent in the HTTP request. Each header is a key-value pair.
    
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


const seeComplaints =async(req)=>{
const verify = await findUserFromToken(req);
const user = await userModel.findOne({ _id: verify });

        if (!user) {
            const error= new Error(errorMessages.invalid.message);
        error.statusCode = errorMessages.invalid.statusCode;
        throw error;
        }
        else{

           const userComplaints= await complaintModel.find(
              { user_id: verify }).select('complaintText')
           .exec();
          return userComplaints ;
                     
                
              if (!userComplaints) {
                return { success: false, message: "No complaints found for this user." };
            } else {
                return { success: true, userComplaints }; 
            }; };
}
        



 const addC =async(req)=>{
    const verify = await findUserFromToken(req);

    const user = await userModel.findOne({ _id: verify });
    
            if (!user) {
                const error= new Error(errorMessages.invalid.message);
            error.statusCode = errorMessages.invalid.statusCode;
            throw error;
            }
    
            else{
    //query to add complaint in a specific category on a specific id 
    const {complaintText , category_id} =req.body ;
        const categoryExists = await categorieModel.findOne({ _id: category_id , user_id:verify});
        
        if (!categoryExists) {
          console.error("Category does not exist for this user.");
          return { success: false, message: "Invalid category for this user ." };
        }
       
        const newComplaint =new complaintModel ({
          user_id: verify,
          complaintText,
         category_id
        });
      
      const result = await newComplaint.save();
     
        if (result) {
            return { success: true, message: "Complaint added.", complaintId: result._id ,complaint: result};
          } else {
            return { success: false, message: "Failed to add complaint." };
          }
        }
      };
      
                  
 module.exports ={
    seeComplaints,
    addC
 }