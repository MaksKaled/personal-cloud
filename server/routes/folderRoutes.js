const fs = require('fs')
const express = require('express')
const Directory = require ('../models/Directory');
const router = express.Router();
const path = require('path')

router.post('/newFolder', (req, res) => {
    const { folderPath } = req.body;
  
    if (!folderPath) {
      return res.status(400).json({ message: 'Не указан путь для создания папки' });
    }
  const fullpath = path.join(__dirname,'../uploads',folderPath)
    fs.mkdir(fullpath, { recursive: true }, async  (err) => {
      if (err) {
        console.error('Ошибка при создании папки на сервере:', err); // Логирование ошибки
        return res.status(500).json({ message: 'Ошибка при создании папки', error: err.message });
      }
      try {
        const newFolder = new Directory({
          name: path.basename(folderPath),
          path:fullpath,
          isDirectory:true
        })

        await newFolder.save();

        res.status(201).json({ message: 'Папка успешно создана и сохранена в базе данных',
          folder:newFolder 

        });
        

      } catch (dbError) {
        console.error('Ошибка при сохранении папки в базе данных:', dbError); // Логирование ошибки
        res.status(500).json({message:'ошибка при сохранении папки в базе данных',error: dbError.message})
      }
      
    });
  });

  module.exports = router;