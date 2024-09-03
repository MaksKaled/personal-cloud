const fs = require('fs')
const express = require('express')

const router = express.Router();

router.post('/newFolder', (req, res) => {
    const { folderPath } = req.body;
  
    if (!folderPath) {
      return res.status(400).json({ message: 'Не указан путь для создания папки' });
    }
  
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка при создании папки', error: err.message });
      }
      res.status(201).json({ message: 'Папка успешно создана' });
    });
  });

  module.exports = router;