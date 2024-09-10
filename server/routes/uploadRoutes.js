const path = require('path');
const multer = require('multer');
const express = require('express')

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

router.post('/upload',upload.single('file'),(req,res)=> {
    const file = req.file
    res.json({
        message:'файл успешно загружен',
        file:{
            filename:file.filename,
            mimetype:file.mimetype,
            path:file.path,
            size:file.size
        }
    });
})

module.exports = router;

