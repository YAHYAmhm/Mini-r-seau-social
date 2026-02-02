import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // JSON Server default port
});

export default api;
