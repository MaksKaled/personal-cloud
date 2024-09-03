const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json())

const uploadRouter = require('./routes/uploadRoutes')
const folderRouter = require('./routes/folderRoutes')
const getFileRouter = require('./routes/getFileRoutes')

app.use('/upload',express.static(path.join(__dirname,'uploads')))

app.use('/api',uploadRouter)
app.use('/api',folderRouter)
app.use('/api',getFileRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`сервер запущен на порту ${PORT}`)
})