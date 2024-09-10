import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addFile } from '../redux/actions/fileActions';
import store from '../redux/store';
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Выберите файл для загрузки');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8'
          
        },
      });
  
      // Выводим весь ответ сервера
      console.log('Ответ от сервера:', response.data);
  
      if (response.data && response.data.file) {
        dispatch(addFile(response.data.file));
        const state = store.getState();
        console.log('Состояние Redux после добавления файла:', state.files);
      } else {
        console.error('Не удалось получить метаданные файла из ответа сервера');
      }
    } catch (error) {
      alert('Ошибка при загрузке файла');
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить файл</button>
    </div>
  );
};

export default FileUpload;
