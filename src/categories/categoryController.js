const express = require('express');
const { Request, Response } =require('express');
const {categoriesList , AddCategory } =require("./categoryService");
const jwt = require('jsonwebtoken');
const userError = require("../../error");

const showCatergories = async(req,res)=>{
    try{
        console.log("im in show categories controller function");
        const result = await categoriesList(req);
        res.status(200).send(result);
    }
    catch(error){
       res.status(error.statusCode || 400).json({
           message: error.message,
       });
    }
   };//

   const addCategory = async(req,res)=>{
    try{
        console.log("im in add category controller function");
        const result = await AddCategory(req);
        res.status(200).send(result);
    }
    catch(error){
       res.status(error.statusCode || 400).json({
           message: error.message,
       });
    }
   };

   module.exports={
    showCatergories ,
  addCategory
   } ;