const path = require('path');
const multer = require('multer');
const express = require('express')

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,path.join(__dirname,'../uploads'))
    },
    filename:(req,file,cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

router.post('/upload',upload.single('file'),(req,res)=> {
    res.json({message:'файл успешно загружен',file:req.file});
})

module.exports = router;

