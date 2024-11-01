const express = require('express');
const myRoutes = express.Router();
const complaintController= require("./complaintController");


myRoutes.use("/userComplaints",complaintController.userComplaints);
myRoutes.use("/addComplaint",complaintController.addComplaint);


module.exports = myRoutes;