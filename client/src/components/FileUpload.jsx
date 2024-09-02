import React, {useState} from 'react'
import axios from 'axios'

const FileUpload = () => {
    const [file,setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleUpload = async () => {
        if(!file){
            alert('выберите файл для загрузки')
            return;
        }
        const formData = new FormData();
        formData.append('file',file)

        try {
            const response = await axios.post('http://localhost:5000/api/upload',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
            })
            alert('файл успешно зашружен!');
            console.log(response.data)
        } catch (error) {
            alert('ошибка при загрузке файла');
            console.error(error)
        }
    }

    
  return (
    <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>загрузить файл</button>
    </div>
  )
}

export default FileUpload