export const getDisplayName = (file) => {
    if(file.isDirectory){
        return file.filename
    }
     try {
        const decodedName = decodeURIComponent(file.filename)
        const parts = decodedName.split('-');
        return parts.slice(1).join('-');
     } catch (error) {
        console.error('ошибка декодирования названия файла:',error);
        return file.filename
     }
    // const parts = file.filename.split('-');
    // return parts.slice(1).join('-');
}

