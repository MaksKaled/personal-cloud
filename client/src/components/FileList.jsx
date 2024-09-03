import React,{useState,useEffect} from 'react'
import axios from 'axios'

const FileList = () => {
    const [files,setFiles] = useState([]);

    useEffect(()=>{
        const fetchFiles = async () => {
            try {
                const response  = await axios.get('http://localhost:5000/api/files');
                setFiles(response.data)
            } catch (error) {
                console.error('ошибка при получении файлов',error);
            }
        }
        fetchFiles()
    },[])

    
  return (
    <>
    <h2>файлы в папке uploads:</h2>
    <div id='container'>
        {files.length > 0 ? (
            files.map((file,index)=>(
                <img
                key={index} 
                src={`http://localhost:5000/upload/${file}`} 
                alt={`файл ${file}`} 
                style={{ width: '200px', height: 'auto', margin: '10px' }}
                />
            ))
        ) : (
            <p>файлы не найдены</p>
        ) }
    </div>
    </>
  )
}

export default FileList