import React,{useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchFiles } from '../redux/actions/fileThunks'
import { SERVER_URL } from '../envVariables'


const CreateFolder = () => {
    const [folderName,setFolderName] = useState('')
    const [message,setMessage] = useState('')
    const dispatch = useDispatch()
    const handleInputChange = (e) => {
        setFolderName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_URL}/api/newFolder`,{
                folderPath:folderName,
            })
            setMessage('папка успешно создана!');
            dispatch(fetchFiles())
            setFolderName('')
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setMessage('ошибка при создании папки: ' + error.message.data.message)
            }else{
                setMessage('ошибка при создании папки: ' + error.message)
            }
            
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