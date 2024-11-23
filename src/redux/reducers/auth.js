import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS, // importando desde types
    LOGIN_FAIL,
    LOGOUT,
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    username: '',
    email: '',
    password: '',
    re_password: '',
    full_name: '',
    phone: '',
    role: null
    
};

function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false // Cambié esto a true para indicar éxito.
            };
        case REGISTER_FAIL:
            return {
                ...state,
            };
        
        // cambios paraa login    
        case LOGIN_SUCCESS:
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
