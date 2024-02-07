const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    questionName:{type:String},
    questionDesc:{type:String},
    questionMetaTag:{type:String},
    questionMetaDesc:{type:String},
    date:{type:Date, default:new Date()},
    author:{type:String},
    view:{type:Number, default:0},
    language:{type:String},
})

module.exports = mongoose.model("Question",QuestionSchema)