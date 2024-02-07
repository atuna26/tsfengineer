const mongoose = require("mongoose")

const WordSchema = new mongoose.Schema({
    wordName:{type:String},
    wordDesc:{type:String},
    wordMetaTag:{type:String},
    wordMetaDesc:{type:String},
    date:{type:Date, default:new Date()},
    author:{type:String},
    view:{type:Number, default:0},
    language:{type:String},
})

module.exports = mongoose.model("Word",WordSchema)