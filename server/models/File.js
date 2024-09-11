const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename:{type:String,required:true},
    size:{type:Number,required:true},
    mimetype:{type:String,required:true},
    path:{type:String,required:true},
    isDirectory:{type:Boolean,required:true},
    uploadDate:{type:Date,default: Date.now},
})

const File =  mongoose.model('File',fileSchema)

module.exports = File;