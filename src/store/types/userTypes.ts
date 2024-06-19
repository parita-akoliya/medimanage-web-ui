export const CHANGE_ROLE_REQUEST = 'CHANGE_ROLE_REQUEST';
export const CHANGE_ROLE_SUCCESS = 'CHANGE_ROLE_SUCCESS';
export const CHANGE_ROLE_FAILURE = 'CHANGE_ROLE_FAILURE';

export const UPDATE_EMAIL_REQUEST = 'UPDATE_EMAIL_REQUEST';
export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'UPDATE_EMAIL_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';


interface ChangeRoleRequest {
    type: typeof CHANGE_ROLE_REQUEST;
    payload: any;
}

interface ChangeRoleSuccess {
    type: typeof CHANGE_ROLE_SUCCESS;
    payload: any;
}

interface ChangeRoleFailure {
    type: typeof CHANGE_ROLE_FAILURE;
    error: string;
}

interface UpdateEmailRequest {
    type: typeof UPDATE_EMAIL_REQUEST;
    payload: any;
}

interface UpdateEmailSuccess {
    type: typeof UPDATE_EMAIL_SUCCESS;
    payload: any;
}

interface UpdateEmailFailure {
    type: typeof UPDATE_EMAIL_FAILURE;
    error: string;
}

interface ResetPasswordRequest {
    type: typeof RESET_PASSWORD_REQUEST;
    payload: any;
}

interface ResetPasswordSuccess {
    type: typeof RESET_PASSWORD_SUCCESS;
    payload: any;
}

interface ResetPasswordFailure {
    type: typeof RESET_PASSWORD_FAILURE;
    error: string;
}

interface GetUserRequest {
    type: typeof GET_USER_REQUEST;
    payload: any;
}

interface GetUserSuccess {
    type: typeof GET_USER_SUCCESS;
    payload: any;
}

interface GetUserFailure {
    type: typeof GET_USER_FAILURE;
    error: string;
}

interface DeleteUserRequest {
    type: typeof DELETE_USER_REQUEST;
    payload: any;
}

interface DeleteUserSuccess {
    type: typeof DELETE_USER_SUCCESS;
    payload: any;
}

interface DeleteUserFailure {
    type: typeof DELETE_USER_FAILURE;
    error: string;
}

interface GetAllUsersRequest {
    type: typeof GET_ALL_USERS_REQUEST;
}

interface GetAllUsersSuccess {
    type: typeof GET_ALL_USERS_SUCCESS;
    payload: any;
}

interface GetAllUsersFailure {
    type: typeof GET_ALL_USERS_FAILURE;
    error: string;
}

interface UpdateUserRequest {
    type: typeof UPDATE_USER_REQUEST;
}

interface UpdateUserSuccess {
    type: typeof UPDATE_USER_SUCCESS;
    payload: any;
}

interface UpdateUserFailure {
    type: typeof UPDATE_USER_FAILURE;
    error: string;
}

export type UserActionTypes =
    | ChangeRoleRequest
    | ChangeRoleSuccess
    | ChangeRoleFailure
    | UpdateEmailRequest
    | UpdateEmailSuccess
    | UpdateEmailFailure
    | ResetPasswordRequest
    | ResetPasswordSuccess
    | ResetPasswordFailure
    | GetUserRequest
    | GetUserSuccess
    | GetUserFailure
    | DeleteUserRequest
    | DeleteUserSuccess
    | DeleteUserFailure
    | GetAllUsersRequest
    | GetAllUsersSuccess
    | GetAllUsersFailure
    | UpdateUserRequest
    | UpdateUserSuccess
    | UpdateUserFailure;
