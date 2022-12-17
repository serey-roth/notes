import axios from 'axios'

const configOptions = {
    baseURL: 'http://localhost:5050'
}

const api = axios.create(configOptions);

api.interceptors.request.use((req) => {
    const user = localStorage.getItem('currentUser');
    if (user && JSON.parse(user)) {
        req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
    }
    return req;
})

export const getNotes = () => decoratePromise(api.get('/notes'));

export const addNote = (note) => decoratePromise(api.post('/notes', note));

export const updateNote = ({ id, note }) => decoratePromise(api.patch(`/notes/${id}`, note));

export const deleteNote = (id) => decoratePromise(api.delete(`/notes/${id}`));

export const getNote = (id) => decoratePromise(api.get(`/notes/${id}`));

export const signIn = (credentials) => decoratePromise(api.post('/users/signIn', credentials));

export const signUp = (credentials) => decoratePromise(api.post('/users/signUp', credentials));

function decoratePromise(promise) {
    return promise
        .then(response => response.data)
        .catch(error => console.log(error.message));
}