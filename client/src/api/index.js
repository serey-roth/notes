import axios from 'axios'

const configOptions = {
    baseURL: 'http://localhost:5050',
}

const api = axios.create(configOptions);

api.interceptors.request.use((req) => {
    const userToken = localStorage.getItem('currentUser');
    if (userToken && JSON.parse(userToken)) {
        req.headers.Authorization = `Bearer ${JSON.parse(userToken)}`;
    }
    return req;
})

export const getNotes = () => 
    decoratePromise(api.get('/notes'));

export const addNote = (note) => 
    decoratePromise(api.post('/notes', note));

export const updateNote = ({ id, note }) => 
    decoratePromise(api.patch(`/notes/${id}`, note));

export const deleteNote = (id) => 
    decoratePromise(api.delete(`/notes/${id}`));

export const login = (credentials) => 
    decoratePromise(api.post('/auth/login', credentials));

export const register = (credentials) => 
    decoratePromise(api.post('/auth/register', credentials));

export const googleLogin = (credential) => decoratePromise(api.post('/auth/googleLogin', { credential }));

function decoratePromise(promise) {
    return promise
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.message)
        });
}