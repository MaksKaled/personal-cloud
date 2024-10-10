const express = require('express');
const fs = require('fs');
const path = require('path');

router.delete('deleteFile',(req,res)=>{
    const {filePath} = req.body;

    if(!filePath){
        return res.status(400).json({message:'путь к файлу не указан'});
    }

    const absolutePath = path.join(__dirname,'uploads',filePath);

    fs.unlink(absolutePath, (err) => {
        if (err) {
          console.error('Ошибка при удалении файла:', err);
          return res.status(500).json({ message: 'Не удалось удалить файл' });
        }
    
        res.status(200).json({ message: 'Файл успешно удален' });
      });
    });


    module.exports = router;