import { ADD_SLOTS_FAILURE, ADD_SLOTS_REQUEST, ADD_SLOTS_SUCCESS, AVAILABLE_SLOTS_FAILURE, AVAILABLE_SLOTS_REQUEST, AVAILABLE_SLOTS_SUCCESS, FILTER_SLOTS_FAILURE, FILTER_SLOTS_REQUEST, FILTER_SLOTS_SUCCESS, GET_APPOINTMENT_REQUEST, GET_APPOINTMENT_SUCCESS, SCHEDULE_APPOINTMENT_FAILURE, SCHEDULE_APPOINTMENT_REQUEST, SCHEDULE_APPOINTMENT_SUCCESS } from "../types/slotTypes";

export const addSlotsRequest = (query: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: ADD_SLOTS_REQUEST,
    payload: query,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const addSlotsSuccess = (data: any) => ({
    type: ADD_SLOTS_SUCCESS,
    payload: data
});

export const addSlotsFailure = (error: any) => ({
    type: ADD_SLOTS_FAILURE,
    payload: error
});

export const availableSlotsRequest = (query: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: AVAILABLE_SLOTS_REQUEST,
    payload: query,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const availablSlotsSuccess = (data: any) => ({
    type: AVAILABLE_SLOTS_SUCCESS,
    payload: data
});

export const availablSlotsFailure = (error: any) => ({
    type: AVAILABLE_SLOTS_FAILURE,
    payload: error
});

export const filterSlotsRequest = (query: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: FILTER_SLOTS_REQUEST,
    payload: query ? query : undefined,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const filterSlotsSuccess = (data: any) => ({
    type: FILTER_SLOTS_SUCCESS,
    payload: data
});

export const filterSlotsFailure = (error: any) => ({
    type: FILTER_SLOTS_FAILURE,
    payload: error
});

export const scheduleAppointmentRequest = (query: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: SCHEDULE_APPOINTMENT_REQUEST,
    payload: query,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const scheduleAppointmentSuccess = (data: any) => ({
    type: SCHEDULE_APPOINTMENT_SUCCESS,
    payload: data
});

export const scheduleAppointmentFailure = (error: any) => ({
    type: SCHEDULE_APPOINTMENT_FAILURE,
    payload: error
});

export const getAppointmentRequest = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_APPOINTMENT_REQUEST,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const getAppointmentSuccess = (data: any) => ({
    type: GET_APPOINTMENT_SUCCESS,
    payload: data
});

export const GET_APPOINTMENT_FAILURE = (error: any) => ({
    type: SCHEDULE_APPOINTMENT_FAILURE,
    payload: error
});

