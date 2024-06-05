import {
    VERIFY_OTP_SUCCESS,
    AuthActionTypes,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    VERIFY_OTP_FAILURE,
    REGISTER_PATIENT_SUCCESS,
    REGISTER_PATIENT_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_REQUEST,
} from '../types/authTypes';

export interface AuthState {
    patient_registered?: boolean;
    forgot_password_success?: boolean;
    isAuthenticated: boolean;
    token?: String | null;
    role?: String | null
    email?: string | null;
    error: string | null;
}
const token = localStorage.getItem('token');
const isAuthenticated = token !== null && token.length > 0;
console.log(token, isAuthenticated);

const initialState: AuthState = {
    isAuthenticated: isAuthenticated,
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    error: null,
};

const auth = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            const role = localStorage.getItem("role")!
            localStorage.setItem("prevRole", role)
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            return {
                ...state,
                token: null,
                role: null,
                isAuthenticated: false
            }
        case VERIFY_OTP_SUCCESS:
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                role: action.payload.role
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: action.payload.verified,
                email: action.payload.email,
                token: action.payload,
                error: null,
            };
        case REGISTER_PATIENT_SUCCESS:
            return {
                ...state,
                patient_registered: true,
                isAuthenticated: false,
                token: null,
                role: null,
                error: null,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgot_password_success: true,
                isAuthenticated: false,
                token: null,
                role: null,
                error: null,
            };
        case LOGIN_USER_FAILURE:
        case REGISTER_PATIENT_FAILURE:
        case VERIFY_OTP_FAILURE:
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                error: action.error,
            };
        default:
            return state;
    }
};

export default auth;
