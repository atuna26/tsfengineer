const mongoose = require("mongoose");

const CategorySchema= new mongoose.Schema({
    categoryNameTR:{type:String},
    categoryNameEN:{type:String},
    categoryNameAR:{type:String},
    categoryMetaTag:{type:String},
    categoryMetaDesc:{type:String},
})
module.exports = mongoose.model("Category",CategorySchema)