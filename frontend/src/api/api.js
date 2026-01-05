import axios from 'axios';


const BASE_URL = 'https://tech-k27j.onrender.com/api';


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