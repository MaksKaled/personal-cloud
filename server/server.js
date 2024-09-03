const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json())

const uploadRouter = require('./routes/uploadRoutes')
const folderRouter = require('./routes/folderRoutes')

app.use('/api',uploadRouter)
app.use('/api',folderRouter)








const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`сервер запущен на порту ${PORT}`)
})