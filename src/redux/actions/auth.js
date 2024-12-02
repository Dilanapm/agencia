import axios from 'axios';
import { } from './types';
import Cookies from 'js-cookie'
import { LOGIN_SUCCESS, LOGIN_FAIL,REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from './types';

export const register = (username, email, password, re_password, full_name, phone, role) => async dispatch => {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({username, email, password, re_password, full_name, phone, role});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register/`,body,config);

        if(res.data.error){
            dispatch({
                type: REGISTER_FAIL
            });
        }else{
            dispatch({
                type: REGISTER_SUCCESS
            });
        }

    } catch(err){
        // console.log('Token CSRF:', Cookies.get('csrftoken'));  // Debe imprimir el token
        dispatch({
            type: REGISTER_FAIL
        });
    }
}; 


export const login = (username, password) => async (dispatch) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login/`, {
            username,
            password,
        });

        if (res.data.token) {
            localStorage.setItem('token', res.data.token); // Guarda el token
            localStorage.setItem('role', res.data.role); // Guarda el rol
            console.log("LOGIN_SUCCESS ejecutado:", res.data); // Verifica si esta línea aparece en la consola
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data, // Incluye token y rol
            });
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
        throw err.response?.data?.error || 'Error de autenticación';
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users/logout/`, {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        });
        // Elimina los datos del usuario localmente
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        dispatch({
            type: LOGOUT,
        });
    } catch (error) {
        console.error('Error al hacer logout:', error);
    }
};

export const checkAuthenticated = () => async (dispatch) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/check-authenticated/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`, // Incluye el token si existe
            },
        });

        if (res.data.isAuthenticated === 'success') {
            const role = localStorage.getItem('role'); // Obtén el rol del localStorage
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { token: localStorage.getItem('token'), role }, // Usa los datos del localStorage
            });
        } else {
            dispatch({ type: LOGIN_FAIL });
        }
    } catch (err) {
        console.error('Error verificando autenticación:', err);
        dispatch({ type: LOGIN_FAIL });
    }
};