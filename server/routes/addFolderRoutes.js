const fs = require('fs');
const express = require('express');
const Directory = require('../models/Directory');
const router = express.Router();
const path = require('path');

const getUniqueFolderName = require('../functions/getUniqueFolderName');

router.post('/newFolder', async (req, res) => {
  const { folderPath } = req.body;

  if (!folderPath || folderPath.trim() === '') {
    return res.status(400).json({ message: 'Не указано имя для создания папки' });
  }

  const basePath = path.join(__dirname, '../uploads');

  try {
    const { uniqueName, index } = await getUniqueFolderName(folderPath, basePath);

    const fullPath = path.join(basePath, uniqueName);

    if (fs.existsSync(fullPath)) {
    }

    fs.mkdir(fullPath, { recursive: true }, async (err) => {
      if (err) {
        console.error('Ошибка при создании папки на сервере:', err);
        return res.status(500).json({ message: 'Ошибка при создании папки', error: err.message });
      }

      try {
        const newFolder = new Directory({
          name: uniqueName,
          path: fullPath,
          isDirectory: true,
          index: index,
        });

        await newFolder.save();

        res.status(201).json({
          message: 'Папка успешно создана и сохранена в базе данных',
          folder: newFolder,
        });
      } catch (dbError) {
        console.error('Ошибка при сохранении папки в базе данных:', dbError);
        res.status(500).json({ message: 'Ошибка при сохранении папки в базе данных', error: dbError.message });
      }
    });
  } catch (error) {
    console.error('Ошибка при создании папки:', error);
    res.status(500).json({ message: 'Ошибка при создании папки', error: error.message });
  }
});

module.exports = router;
