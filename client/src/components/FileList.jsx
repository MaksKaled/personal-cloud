import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchFiles } from '../redux/actions/fileThunks'
import pdfIcon from '../assets/pdfIcon.png'
import wordIcon from '../assets/wordIcon.png'
import folderIcon from '../assets/folder.png'
import defaultFileIcon from '../assets/defaultFile(unknown).png'
import { getDisplayName } from '../functions/getDisplayName'
const FileList = () => {
    const dispatch = useDispatch()
    const {files,loading,error} = useSelector((state) => state.files)

    useEffect(()=>{
        dispatch(fetchFiles())
    },[dispatch])
   
   if(loading) return <p>loading...</p>
   if (error) return <p>Ошибка: {error.message || 'Не удалось загрузить файлы'}</p>;

   
  return (
    <>
      <h2>файлы в папке uploads:</h2>
      <div id='container' style={{display:'flex', width:'fit-content',flexWrap:'wrap'}}>
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} style={{  margin: '10px', width:'fit-content'}}>
          
              {file.isDirectory ? (
                <img src={folderIcon} alt="Folder" style={{ width: '100px', height: 'auto', display:'flex',alignItems: 'center' }} />
              ) : file.mimetype.startsWith('image/') ? (
                
                <img src={`http://localhost:5000/upload/${file.filename}`} alt={file.filename} style={{ width: '100px', height: 'auto' }} />
              ) : file.mimetype === 'application/pdf' ?  (
                
                <img src={pdfIcon} alt="PDF File" style={{ width: '100px', height: 'auto' }} />
              ) : file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
                <img src={wordIcon} alt="Word File" style={{ width: '100px', height: 'auto' }} />
              ) : (
                <img src={defaultFileIcon} alt="File"  style={{width: '100px', height: 'auto'}}/>
              )}  
              <p>{getDisplayName(file)}</p>
            </div>
          ))
        ) : (
          <p>файлы не найдены</p>
        )}
      </div>
    </>
  )
}

export default FileList