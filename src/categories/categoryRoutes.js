const express = require('express');
const myRoutes = express.Router();
const categoryController= require("./categoryController");


myRoutes.use("/showCategory",categoryController.showCatergories);
myRoutes.use("/addCategory",categoryController.addCategory);


module.exports = myRoutes;