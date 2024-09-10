const fs = require('fs');
const path = require('path');
const {getMimeType} = require('./getMimeType');

const uploadsDir = path.join(__dirname,'../uploads');

const getFileDetails = (file) => {
    return new Promise((resolve,reject)=>{
        const filePath = path.join(uploadsDir,file)

        fs.stat(filePath,(err,stats)=>{
            if(err){
                reject(err)
            }else{
                const isDirectory = stats.isDirectory();

                    resolve({
                        filename:file,
                        size:isDirectory ? 0 : stats.size,
                        mimetype: isDirectory ? 'folder' : getMimeType(file),
                        path: filePath,
                        isDirectory

                    })
            }
        })
    })
}

const getAllFileDetails = (files) => {
    const filePromises = files.map(getFileDetails);
    return Promise.all(filePromises)
}

module.exports = {
    getFileDetails,
    getAllFileDetails
}