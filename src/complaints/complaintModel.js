const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: "user",    // Reference to the user collection
    required: true 
  },
  complaintText: { 
    type: String, 
    required: true 
  },
  category_id: { 
    type: Schema.Types.ObjectId, 
    ref: "categories", // Reference to the categories collection
    required: true 
  }
});

module.exports = mongoose.model("complaint", complaintSchema);
