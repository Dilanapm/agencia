import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    username: '',
    email: '',
    password: '',
    re_password: '',
    full_name: '',
    phone: '',
    role: 'Adoptante'
    
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
        default:
            return state;
    }
}

export default authReducer;
