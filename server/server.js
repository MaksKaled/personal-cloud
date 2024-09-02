const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json())


const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,path.join(__dirname,'uploads'))
    },
    filename:(req,file,cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

app.post('/api/upload',upload.single('file'),(req,res)=> {
    res.json({message:'файл успешно загружен',file:req.file});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`сервер запущен на порту ${PORT}`)
})