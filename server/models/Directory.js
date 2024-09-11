const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
    name:{type:String, required:true},
    path:{type:String, required:true},
    isDirectory:{type:Boolean, default:true},
})

const Directory = mongoose.model('Directory',directorySchema)

module.exports = Directory;