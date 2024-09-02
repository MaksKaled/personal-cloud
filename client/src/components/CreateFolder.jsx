import React,{useState} from 'react'
import axios from 'axios'

const CreateFolder = () => {
    const [folderName,setFolderName] = useState('')
    const [message,setMessage] = useState('')

    const handleInputChange = (e) => {
        setFolderName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/newFolder',{
                folderPath:folderName,
            })
            setMessage('папка успешно создана!');
        } catch (error) {
            setMessage('ошибка при создании папки: ' + error.message.data.message)
        }
    }
  return (
    <>
        <h2>создать новую папку</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" 
                value={folderName}
                onChange={handleInputChange}
                placeholder='имя папки'
            />
            <button type="submit">Создать папку</button>
            {message && <p>{message}</p>}
        </form>
    </>
)
}

export default CreateFolder