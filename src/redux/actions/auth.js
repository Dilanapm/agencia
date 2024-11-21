import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL} from './types';
import Cookies from 'js-cookie'
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';

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
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login/`, body, config);

        if (res.data.token) {
            localStorage.setItem('token', res.data.token); // Guarda el token en localStorage
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data, // Incluye el token y cualquier otra información
            });
        } else {
            dispatch({
                type: LOGIN_FAIL,
            });
        }
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};
// export const checkAuthenticated = () => async dispatch => {
//     const config = {
//         headers: {
//             'Accept': 'application/json',
//         },
//     };

//     try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/check-authenticated/`, config);


//         if (res.data.isAuthenticated === 'success') {
//             console.log('Usuario autenticado');
//         } else {
//             console.log('Usuario no autenticado');
//         }
//     } catch (err) {
//         console.error('Error verificando autenticación:', err);
//     }
// };
