import {
    CHANGE_ROLE_SUCCESS,
    CHANGE_ROLE_FAILURE,
    UPDATE_EMAIL_SUCCESS,
    UPDATE_EMAIL_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE,
} from '../types/userTypes';

export interface UserState {
    role?: string | null;
    email?: string | null;
    users?: any;
    error: string | null;
}


const initialState: UserState = {
    role: localStorage.getItem('role'),
    error: null,
};

const user = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case CHANGE_ROLE_SUCCESS:
            localStorage.setItem('role', action.payload.role);
            return {
                ...state,
                role: action.payload.role,
            };
        case CHANGE_ROLE_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case UPDATE_EMAIL_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
            };
        case UPDATE_EMAIL_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                role: null,
            };
        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                ...action.payload.user,
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                role: null,
            };
        case DELETE_USER_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        case GET_ALL_USERS_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default user;
