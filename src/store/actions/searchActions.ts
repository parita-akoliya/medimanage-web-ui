import { CallbackFunctions } from '../../shared/models/Actions';
import {
    SEARCH_CLINICS_REQUEST,
    SEARCH_CLINICS_SUCCESS,
    SEARCH_CLINICS_FAILURE,
    SEARCH_DOCTORS_REQUEST,
    SEARCH_DOCTORS_SUCCESS,
    SEARCH_DOCTORS_FAILURE
} from '../types/searchTypes';

export const searchClinicsRequest = (query: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: SEARCH_CLINICS_REQUEST,
    payload: query,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const searchClinicsSuccess = (data: any) => ({
    type: SEARCH_CLINICS_SUCCESS,
    payload: data
});

export const searchClinicsFailure = (error: any) => ({
    type: SEARCH_CLINICS_FAILURE,
    payload: error
});

export const searchDoctorsRequest = (query: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: SEARCH_DOCTORS_REQUEST,
    payload: query,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const searchDoctorsSuccess = (data: any) => ({
    type: SEARCH_DOCTORS_SUCCESS,
    payload: data
});

export const searchDoctorsFailure = (error: any) => ({
    type: SEARCH_DOCTORS_FAILURE,
    payload: error
});
