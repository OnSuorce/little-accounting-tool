// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8090', // Cambia l'URL se necessario
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            // Gestione dell'errore 401, ad esempio reindirizzare alla pagina di login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
