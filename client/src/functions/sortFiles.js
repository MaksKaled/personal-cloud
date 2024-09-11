import { getDisplayName } from "./getDisplayName";

export const sortFiles = (files) => {
     const folders = files.filter(file => file.isDirectory);
     const otherFiles = files.filter(file => !file.isDirectory);

     const images = otherFiles.filter(file => file.mimetype.startsWith('image/'));
     const pdfs = otherFiles.filter(file => file.mimetype === 'application/pdf');
     const words = otherFiles.filter(
        file => file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
     )

     const others = otherFiles.filter(file => 
        !file.mimetype.startsWith('image/') && 
        !file.mimetype === 'application/pdf' &&
        !file.mimetype === 'application/msword' &&
        !file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
     )

     const sortByName = (a,b) => getDisplayName(a).localeCompare(getDisplayName(b));

     folders.sort(sortByName)
     images.sort(sortByName)
     pdfs.sort(sortByName)
     words.sort(sortByName)
     others.sort(sortByName)

     return [...folders, ...images,...pdfs,...words,...others]
}