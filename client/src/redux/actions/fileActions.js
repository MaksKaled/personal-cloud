export const ADD_FILE = 'ADD_FILE';

export const addFile = (fileMetadata) => ({
    type : ADD_FILE,
    payload : fileMetadata,
})