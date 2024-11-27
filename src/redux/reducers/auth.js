import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS, // importando desde types
    LOGIN_FAIL,
    LOGOUT,
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    token: null, // Intenta inicializar desde localStorage
    role: null, // Rol desde localStorage
};

function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            };
        case REGISTER_FAIL:
            return {
                ...state,
            };
        
        // cambios paraa login    
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS ejecutado:", payload);
            localStorage.setItem('role', payload.role); // Guarda el rol en localStorage
            return {
                ...state,
                isAuthenticated: true,
                token: payload.token,
                role: payload.role,
            };
        // cambios para login hasta aqui
        //cambios para logout
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
            };
            case LOGOUT:
                localStorage.removeItem('token'); // Elimina el token de localStorage
                localStorage.removeItem('role');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                role: null,
            };
        // cambios para logout hasta aqui
        default:
            return state;
    }
}

export default authReducer;
