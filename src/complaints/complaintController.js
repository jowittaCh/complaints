const express = require('express');
const { Request, Response } =require('express');
const {seeComplaints , addC } =require("./complaintService");
const jwt = require('jsonwebtoken');
const userError = require("../../error");

const userComplaints = async(req,res)=>{
    try{
        console.log("im in userComplaints controller function");
        const result = await seeComplaints(req);
        res.status(200).send(result);
    }
    catch(error){
       res.status(error.statusCode || 400).json({
           message: error.message,
       });
    }
   };
   const addComplaint = async(req,res)=>{
    try{
        console.log("im in addComplaint controller function");
        const result = await addC(req);
        res.status(200).send(result);
    }
    catch(error){
       res.status(error.statusCode || 400).json({
           message: error.message,
       });
    }
   };
   module.exports={
    userComplaints ,
  addComplaint
   } ;