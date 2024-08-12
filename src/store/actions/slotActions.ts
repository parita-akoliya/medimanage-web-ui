import { ADD_SLOTS_FAILURE, ADD_SLOTS_REQUEST, ADD_SLOTS_SUCCESS, ATTEND_APPOINTMENT_REQUEST, AVAILABLE_SLOTS_FAILURE, AVAILABLE_SLOTS_REQUEST, AVAILABLE_SLOTS_SUCCESS, FILTER_SLOTS_FAILURE, FILTER_SLOTS_REQUEST, FILTER_SLOTS_SUCCESS, GET_APPOINTMENT_FAILURE, GET_APPOINTMENT_REQUEST, GET_APPOINTMENT_SUCCESS, GET_APPOINTMENTS_FAILURE, GET_APPOINTMENTS_REQUEST, GET_APPOINTMENTS_SUCCESS, SCHEDULE_APPOINTMENT_FAILURE, SCHEDULE_APPOINTMENT_REQUEST, SCHEDULE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILURE, UPDATE_APPOINTMENT_REQUEST, UPDATE_APPOINTMENT_SUCCESS } from "../types/slotTypes";

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

export const getAppointmentsRequest = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_APPOINTMENTS_REQUEST,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const getAppointmentsSuccess = (data: any) => ({
    type: GET_APPOINTMENTS_SUCCESS,
    payload: data
});

export const getAppointmentsFailure = (error: any) => ({
    type: GET_APPOINTMENTS_FAILURE,
    payload: error
});


export const getAppointmentRequest = (appointmentId: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: GET_APPOINTMENT_REQUEST,
    payload: appointmentId,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const getAppointmentSuccess = (data: any) => ({
    type: GET_APPOINTMENT_SUCCESS,
    payload: data
});

export const getAppointmentFailure = (error: any) => ({
    type: GET_APPOINTMENT_FAILURE,
    payload: error
});

export const updateAppointmentRequest = (appointmentId: string, status: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: UPDATE_APPOINTMENT_REQUEST,
    payload:{appointmentId, status},
    callbacks: {onCallSuccess,
    onCallFail}
});

export const updateAppointmentSuccess = (data: any) => ({
    type: UPDATE_APPOINTMENT_SUCCESS,
    payload: data
});

export const updateAppointmentFailure = (error: any) => ({
    type: UPDATE_APPOINTMENT_FAILURE,
    payload: error
});

export const attendAppointmentRequest = (data: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: ATTEND_APPOINTMENT_REQUEST,
    payload: data,
    callbacks: {onCallSuccess,
    onCallFail}
});

export const attendAppointmentSuccess = (data: any) => ({
    type: GET_APPOINTMENT_SUCCESS,
    payload: data
});

export const attemdAppointmentFailure = (error: any) => ({
    type: GET_APPOINTMENT_FAILURE,
    payload: error
});
