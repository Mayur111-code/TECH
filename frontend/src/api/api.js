import axios from 'axios';


const BASE_URL = 'http://localhost:5000/api';


const API = axios.create({
    baseURL: BASE_URL,
});


API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

export default API;