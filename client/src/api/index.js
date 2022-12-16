import axios from 'axios'

const url = 'http://localhost:5050/notes'

export const getNotes = () => axios.get(url).then(response => response.data);

export const addNote = (note) => axios.post(url, note).then(response => response.data);

export const updateNote = ({ id, note }) => axios.patch(`${url}/${id}`, note).then(response => response.data);

export const deleteNote = (id) => axios.delete(`${url}/${id}`).then(response => {console.log(response); return response.data});

export const getNote = (id) => axios.get(`${url}/${id}`).then(response => response.data);