import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Asegúrate de que esta URL esté correcta
  withCredentials: true, // Envía cookies si el backend lo requiere
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtiene el token del localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Incluye el token en las solicitudes
  }
  return config;
});

export default api;
