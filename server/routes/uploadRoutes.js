const path = require('path');
const multer = require('multer');
const express = require('express')
const File = require('../models/File')
const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,path.join(__dirname,'../uploads'))
    },
    filename:(req,file,cb) => {
        const decodedName = Buffer.from(file.originalname,'latin1').toString('utf-8')
        cb(null, `${Date.now()}-${decodedName}`)
    }
})


        
        
const upload = multer({storage})

router.post('/upload',upload.single('file'), async (req,res)=> {
    try {
        const file = req.file;

        const fileData = {
            filename:file.filename,
            mimetype:file.mimetype,
            path:file.path,
            size:file.size,
            isDirectory: false,
        }

        const newFile = new File(fileData);
        await newFile.save();

        res.json({
            message: 'Файл успешно загружен и сохранен в базе данных',
            file:newFile
        })
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        res.status(500).json({ message: 'Ошибка при загрузке файла' });
    }
   
   
})

module.exports = router;

