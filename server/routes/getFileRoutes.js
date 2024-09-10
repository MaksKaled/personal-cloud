const express = require('express');
const fs = require('fs');
const path = require('path');

const {getAllFileDetails} = require('../functions/fileUtils')

const router = express.Router();
const uploadsDir = path.join(__dirname,'../uploads');

router.get('/files',(req,res)=>{
    fs.readdir(uploadsDir,(err,files)=>{
        if(err){
            return res.status(500).json({message:'ошибка при получении списка файлов'});
        }
        getAllFileDetails(files)
      .then((fileDetails) => res.json(fileDetails))
      .catch(() => res.status(500).json({ message: 'Ошибка при получении информации о файлах' }));
    })
})


  

module.exports = router;