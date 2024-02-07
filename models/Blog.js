const mongoose = require("mongoose")
const BlogSchema = new mongoose.Schema({
    blogName:{type:String},
    blogImage:{type:String},
    blogDesc:{type:String},
    blogCategory:{type: mongoose.Schema.Types.ObjectId, ref:"category"},
    blogMetaTag:{type:String},
    blogMetaDesc:{type:String},
    date:{type:Date, default:new Date()},
    author:{type:String},
    view:{type:Number, default:0},
    language:{type:String},
})
module.exports = mongoose.model("Blog",BlogSchema)