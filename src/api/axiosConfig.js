import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Usa la URL base de tu variable de entorno
    headers: {
        'Content-Type': 'application/json',
    },
});

// Configuración de interceptores
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Recupera el token desde localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Cambiar a Bearer
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
