const mongoose = require("mongoose");

const CategorySchema= new mongoose.Schema({
    categoryName:{type:String},
    language:{type:String},
})
module.exports = mongoose.model("Category",CategorySchema)