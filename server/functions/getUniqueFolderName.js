const Directory = require('../models/Directory');
const fs = require('fs')
const path = require('path')

const getUniqueFolderName = async (folderName, basePath) => {
  let index = 0;
  let uniqueName = folderName;

  let existingDir = await Directory.findOne({ name: uniqueName, path: basePath });

  while (existingDir || fs.existsSync(path.join(basePath, uniqueName))) {
    index++;
    uniqueName = `${folderName}(${index})`;
    
    existingDir = await Directory.findOne({ name: uniqueName, path: basePath });
  }

  return { uniqueName, index };
};

module.exports = getUniqueFolderName;
