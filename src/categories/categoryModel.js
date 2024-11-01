const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: "user",  // Reference to the user collection
    required: true 
  },
  categorieName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  }
});

module.exports = mongoose.model("categories", categorieSchema);