const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const uploadsDir = path.join(__dirname,'../uploads');

router.get('/files',(req,res)=>{
    fs.readdir(uploadsDir,(err,files)=>{
        if(err){
            return res.status(500).json({message:'ошибка при получении списка файлов'});
        }
        res.json(files)
    })
})

module.exports = router;