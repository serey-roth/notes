import axios from 'axios'

const configOptions = {
    baseURL: 'http://localhost:5050'
}

const api = axios.create(configOptions);

export const getNotes = (token) => 
    decoratePromise(api.get('/notes', attachTokenToHeaders(token)));

export const addNote = ({ note, token }) => 
    decoratePromise(api.post('/notes', note, attachTokenToHeaders(token)));

export const updateNote = ({ id, note, token }) => 
    decoratePromise(api.patch(`/notes/${id}`, note, attachTokenToHeaders(token)));

export const deleteNote = ({ id, token }) => 
    decoratePromise(api.delete(`/notes/${id}`, attachTokenToHeaders(token)));

export const signIn = (credentials) => 
    decoratePromise(api.post('/auth/signIn', credentials));

export const signUp = (credentials) => 
    decoratePromise(api.post('/auth/signUp', credentials));


function attachTokenToHeaders(token) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
    }
    return config;
}

function decoratePromise(promise) {
    return promise
        .then(response => response.data)
        .catch(error => console.log(error.message));
}