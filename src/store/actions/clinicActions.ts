import {
    REGISTER_CLINIC_REQUEST,
    REGISTER_CLINIC_SUCCESS,
    REGISTER_CLINIC_FAILURE,
    DELETE_CLINIC_REQUEST,
    DELETE_CLINIC_SUCCESS,
    DELETE_CLINIC_FAILURE,
    UPDATE_CLINIC_REQUEST,
    UPDATE_CLINIC_SUCCESS,
    UPDATE_CLINIC_FAILURE,
    GET_CLINIC_DETAILS_REQUEST,
    GET_CLINIC_DETAILS_SUCCESS,
    GET_CLINIC_DETAILS_FAILURE,
    GET_ALL_CLINIC_REQUEST,
} from '../types/clinicTypes';


export const registerClinicRequest = (clinicData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: REGISTER_CLINIC_REQUEST,
    payload: clinicData,
    callbacks: { onCallSuccess, onCallFail }
});

export const registerClinicSuccess = (clinicData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: REGISTER_CLINIC_SUCCESS,
    payload: clinicData,
    callbacks: { onCallSuccess, onCallFail }
});

export const registerClinicFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: REGISTER_CLINIC_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const deleteClinicRequest = (clinicId: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DELETE_CLINIC_REQUEST,
    payload: { clinicId },
    callbacks: { onCallSuccess, onCallFail }
});

export const deleteClinicSuccess = (clinicId: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DELETE_CLINIC_SUCCESS,
    payload: { clinicId },
    callbacks: { onCallSuccess, onCallFail }
});

export const deleteClinicFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: DELETE_CLINIC_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateClinicRequest = (clinicData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_CLINIC_REQUEST,
    payload: clinicData,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateClinicSuccess = (clinicData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_CLINIC_SUCCESS,
    payload: clinicData,
    callbacks: { onCallSuccess, onCallFail }
});

export const updateClinicFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_CLINIC_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const getClinicDetailsRequest = (clinicId: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_CLINIC_DETAILS_REQUEST,
    payload: { clinicId },
    callbacks: { onCallSuccess, onCallFail }
});

export const getClinicDetailsSuccess = (clinicData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_CLINIC_DETAILS_SUCCESS,
    payload: clinicData,
    callbacks: { onCallSuccess, onCallFail }
});

export const getClinicDetailsFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_CLINIC_DETAILS_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});

export const getAllClinicRequest = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_ALL_CLINIC_REQUEST,
    callbacks: { onCallSuccess, onCallFail }
});

export const getAllClinicSuccess = (clinicData: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_CLINIC_DETAILS_SUCCESS,
    payload: clinicData,
    callbacks: { onCallSuccess, onCallFail }
});

export const getAllClinicFailure = (error: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_CLINIC_DETAILS_FAILURE,
    error,
    callbacks: { onCallSuccess, onCallFail }
});
