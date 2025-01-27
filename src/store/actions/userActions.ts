import {
    CHANGE_ROLE_REQUEST,
    CHANGE_ROLE_SUCCESS,
    CHANGE_ROLE_FAILURE,
    UPDATE_EMAIL_REQUEST,
    UPDATE_EMAIL_SUCCESS,
    UPDATE_EMAIL_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,
    DASHBOARD_FAILURE,
    ADMIN_RESET_PASSWORD_FAILURE,
    ADMIN_RESET_PASSWORD_REQUEST,
    ADMIN_RESET_PASSWORD_SUCCESS,
} from "../types/userTypes";

export const changeRoleRequest = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: CHANGE_ROLE_REQUEST,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const changeRoleSuccess = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: CHANGE_ROLE_SUCCESS,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const changeRoleFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: CHANGE_ROLE_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateEmailRequest = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_EMAIL_REQUEST,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateEmailSuccess = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_EMAIL_SUCCESS,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateEmailFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_EMAIL_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const adminResetPasswordRequest = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: ADMIN_RESET_PASSWORD_REQUEST,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const adminResetPasswordSuccess = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: ADMIN_RESET_PASSWORD_SUCCESS,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const adminResetPasswordFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: ADMIN_RESET_PASSWORD_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const getUserRequest = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_USER_REQUEST,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const getUserSuccess = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_USER_SUCCESS,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const getUserFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_USER_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const deleteUserRequest = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DELETE_USER_REQUEST,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const deleteUserSuccess = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DELETE_USER_SUCCESS,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const deleteUserFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DELETE_USER_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const getAllUsersRequest = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_ALL_USERS_REQUEST,
    callbacks: { onCallSuccess, onCallFail }
});

export const getAllUsersSuccess = (payload: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_ALL_USERS_SUCCESS,
    payload,
    callbacks: { onCallSuccess, onCallFail }
});

export const getAllUsersFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_ALL_USERS_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateUserRequest = (userId: string, userData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_USER_REQUEST,
    payload: {userId,userData},
    callbacks: { onCallSuccess, onCallFail }
});

export const updateUserSuccess = (updatedData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_USER_SUCCESS,
    payload: updatedData,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateUserFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_USER_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const dashboardRequest = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DASHBOARD_REQUEST,
    callbacks: { onCallSuccess, onCallFail }
});

export const dashboardSuccess = (dashboardData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DASHBOARD_SUCCESS,
    payload: dashboardData,
    callbacks: { onCallSuccess, onCallFail }
});

export const dashboardFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DASHBOARD_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});