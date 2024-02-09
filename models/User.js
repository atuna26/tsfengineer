const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    date:{type:Date, default: new Date()},
})

module.exports = mongoose.model("User",UserSchema);