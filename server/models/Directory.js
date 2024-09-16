const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
    name:{type:String, required:true},
    path:{type:String, required:true},
    isDirectory:{type:Boolean, default:true},
    index:{type:Number,default:0}
})

const Directory = mongoose.model('Directory',directorySchema)

module.exports = Directory;