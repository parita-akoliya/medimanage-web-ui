import { takeLatest, put, call } from 'redux-saga/effects';
import { Actions, CallbackFunctions } from '../../shared/models/Actions';
import { toast } from 'react-toastify';
import {
    SEARCH_CLINICS_REQUEST,
    SEARCH_CLINICS_SUCCESS,
    SEARCH_CLINICS_FAILURE,
    SEARCH_DOCTORS_REQUEST,
    SEARCH_DOCTORS_SUCCESS,
    SEARCH_DOCTORS_FAILURE
} from '../types/searchTypes';
import clientApi from '../../shared/api/clientApi';
import { ADD_SLOTS_FAILURE, ADD_SLOTS_REQUEST, ADD_SLOTS_SUCCESS, AVAILABLE_SLOTS_FAILURE, AVAILABLE_SLOTS_REQUEST, AVAILABLE_SLOTS_SUCCESS, GET_APPOINTMENT_FAILURE, GET_APPOINTMENT_REQUEST, GET_APPOINTMENT_SUCCESS, SCHEDULE_APPOINTMENT_FAILURE, SCHEDULE_APPOINTMENT_REQUEST, SCHEDULE_APPOINTMENT_SUCCESS } from '../types/slotTypes';

function handleToast(message: string, type: string) {
    if (type === 'success') {
        toast.success(message);
    } else {
        toast.error(message);
    }
}

function* handleCallbacks(callbacks: CallbackFunctions | void, type: string, ...args: any[]) {
    if (callbacks && callbacks.onCallSuccess && typeof callbacks.onCallSuccess === 'function' && type === 'onCallSuccess') {
        yield call(callbacks.onCallSuccess, ...args);
    } else if (callbacks && callbacks.onCallFail && typeof callbacks.onCallFail === 'function' && type === 'onCallFailure') {
        yield call(callbacks.onCallFail, ...args);
    }
}

function* searchClinicsSaga(action: Actions): Generator<any, any, any> {
    try {
        const response = yield call(clientApi.searchClinics, action.payload);
        yield call(handleToast, response.data.message || 'Clinics fetched successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
        yield put({ type: SEARCH_CLINICS_SUCCESS, payload: response.data });
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Clinics fetching failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', error.response?.data?.error);
        yield put({ type: SEARCH_CLINICS_FAILURE, payload: error.response?.data?.error });
    }
}

function* searchDoctorsSaga(action: Actions): Generator<any, any, any> {
    try {
        const response = yield call(clientApi.searchDoctors, action.payload);
        yield call(handleToast, response.data.message || 'Doctors fetched successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
        yield put({ type: SEARCH_DOCTORS_SUCCESS, payload: response.data });
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Doctors fetching failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', error.response?.data?.error);
        yield put({ type: SEARCH_DOCTORS_FAILURE, payload: error.response?.data?.error });
    }
}

function* addSlotsSaga(action: Actions): Generator<any, any, any> {
    try {
        const response = yield call(clientApi.addSlots, action.payload);
        yield call(handleToast, response.data.message || 'Slots added successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
        yield put({ type: ADD_SLOTS_SUCCESS, payload: response.data });
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Slot addition failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', error.response?.data?.error);
        yield put({ type: ADD_SLOTS_FAILURE, payload: error.response?.data?.error });
    }
}

function* availableSlotsSaga(action: Actions): Generator<any, any, any> {
    try {
        const response = yield call(clientApi.availableSlots, action.payload);
        yield call(handleToast, response.data.message || 'Slots fetched successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
        yield put({ type: AVAILABLE_SLOTS_SUCCESS, payload: response.data });
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Slots not fetched. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', error.response?.data?.error);
        yield put({ type: AVAILABLE_SLOTS_FAILURE, payload: error.response?.data?.error });
    }
}

function* scheduleAppointmentSagas(action: Actions): Generator<any, any, any> {
    try {
        const response = yield call(clientApi.scheduleAppointment, action.payload);
        yield call(handleToast, response.data.message || 'Appointment scheduled successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
        yield put({ type: SCHEDULE_APPOINTMENT_SUCCESS, payload: response.data });
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Appointment not scheduled. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', error.response?.data?.error);
        yield put({ type: SCHEDULE_APPOINTMENT_FAILURE, payload: error.response?.data?.error });
    }
}

function* getAppointmentSagas(action: Actions): Generator<any, any, any> {
    try {
        const response = yield call(clientApi.getAppointments, action.payload);
        yield call(handleToast, response.data.message || 'Appointment fetched successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
        yield put({ type: GET_APPOINTMENT_SUCCESS, payload: response.data });
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Appointment not fetched. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', error.response?.data?.error);
        yield put({ type: GET_APPOINTMENT_FAILURE, payload: error.response?.data?.error });
    }
}



export default function* clientSagas() {
    yield takeLatest(SEARCH_CLINICS_REQUEST, searchClinicsSaga);
    yield takeLatest(SEARCH_DOCTORS_REQUEST, searchDoctorsSaga);
    yield takeLatest(ADD_SLOTS_REQUEST, addSlotsSaga);
    yield takeLatest(AVAILABLE_SLOTS_REQUEST, availableSlotsSaga);
    yield takeLatest(SCHEDULE_APPOINTMENT_REQUEST, scheduleAppointmentSagas);
    yield takeLatest(GET_APPOINTMENT_REQUEST, getAppointmentSagas);
}
