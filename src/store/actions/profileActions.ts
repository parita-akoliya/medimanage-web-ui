import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from "../types/profileTypes";

export const getProfileRequest = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_PROFILE_REQUEST,
    callbacks: { onCallSuccess, onCallFail }
});

export const getProfileSuccess = (profileData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_PROFILE_SUCCESS,
    payload: profileData,
    callbacks: { onCallSuccess, onCallFail }
});

export const getProfileFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_PROFILE_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateProfileRequest = (userData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_PROFILE_REQUEST,
    payload: userData,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateProfileSuccess = (updatedProfile: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: updatedProfile,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateProfileFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_PROFILE_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});