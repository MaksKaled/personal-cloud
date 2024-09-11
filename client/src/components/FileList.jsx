import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchFiles } from '../redux/actions/fileThunks'
import pdfIcon from '../assets/pdfIcon.png'
import wordIcon from '../assets/wordIcon.png'
import folderIcon from '../assets/folder.png'
import defaultFileIcon from '../assets/defaultFile(unknown).png'
import { getDisplayName } from '../functions/getDisplayName'
import { Container,Item,FileName,StyledIcon } from './ComponentStyles/FileList.styles'
import { SERVER_URL } from '../envVariables'
import { sortFiles } from '../functions/sortFiles'

const FileList = () => {
    const dispatch = useDispatch()
    const {files,loading,error} = useSelector((state) => state.files)

    useEffect(()=>{
        dispatch(fetchFiles())
    },[dispatch])
   
   if(loading) return <p>loading...</p>
   if (error) return <p>Ошибка: {error.message || 'Не удалось загрузить файлы'}</p>;

   const sortedFiles = sortFiles(files)
  return (
    <>
      <h2>файлы в папке uploads:</h2>
      <Container>
        {sortedFiles.length > 0 ? (
          sortedFiles.map((file, index) => (
            <Item key={index}>
          
              {file.isDirectory ? (
                <StyledIcon src={folderIcon} alt="Folder"  />
              ) : file.mimetype.startsWith('image/') ? (
                
                <StyledIcon src={`${SERVER_URL}/upload/${file.filename}`} alt={file.filename}  />
              ) : file.mimetype === 'application/pdf' ?  (
                
                <StyledIcon src={pdfIcon} alt="PDF File" />
              ) : file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
                <StyledIcon src={wordIcon} alt="Word File" />
              ) : (
                <StyledIcon src={defaultFileIcon} alt="File"/>
              )}  
              <FileName>{getDisplayName(file)}</FileName>
            </Item>
          ))
        ) : (
          <p>файлы не найдены</p>
        )}
      </Container>
    </>
  )
}

export default FileList