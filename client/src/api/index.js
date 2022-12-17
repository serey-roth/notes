import axios from 'axios'

const configOptions = {
    baseUrl: 'http://localhost:5050'
}

const api = axios.create(configOptions);

api.interceptors.request.use((req) => {
    const user = localStorage.getItem('currentUser');
    if (user && JSON.parse(user)) {
        req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
    }
    return req;
})

export const getNotes = decoratePromise(() => api.get('/notes'));

export const addNote = decoratePromise((note) => api.post('/notes', note));

export const updateNote = decoratePromise(({ id, note }) => api.patch(`/notes/${id}`, note));

export const deleteNote = decoratePromise((id) => api.delete(`/notes/${id}`));

export const getNote = decoratePromise((id) => api.get(`/notes/${id}`));

export const signIn = decoratePromise((credentials) => api.post('/users/signIn', credentials));

export const signUp = decoratePromise((credentials) => api.post('/users/signUp', credentials));

const decoratePromise = (promise) => 
promise
.then(response => response.data)
.catch(error => console.log(error.message));