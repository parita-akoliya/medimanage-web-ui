import { takeLatest, put, call } from 'redux-saga/effects';
import { Actions, CallbackFunctions } from '../../shared/models/Actions';
import { toast } from 'react-toastify';
import {
    getClinicDetailsFailure,
    getClinicDetailsSuccess,
    registerClinicFailure,
    registerClinicSuccess,
    updateClinicFailure,
    updateClinicSuccess,
    deleteClinicFailure,
    deleteClinicSuccess,
    getAllClinicSuccess,
    getAllClinicFailure,
} from '../actions/clinicActions';
import {
    REGISTER_CLINIC_REQUEST,
    DELETE_CLINIC_REQUEST,
    UPDATE_CLINIC_REQUEST,
    GET_CLINIC_DETAILS_REQUEST,
    GET_ALL_CLINIC_REQUEST,
} from '../types/clinicTypes';
import clinicApi from '../../shared/api/clinicApi';

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

function* registerClinicSaga(action: Actions): any {
    try {
        const response = yield call(clinicApi.registerClinic, action.payload);
        yield call(handleToast, response.data.message || 'Clinic registered successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(registerClinicSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Clinic registration failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(registerClinicFailure(error.response.data.error));
    }
}

function* deleteClinicSaga(action: Actions): any {
    try {
        const response = yield call(clinicApi.deleteClinic, action.payload.clinicId);
        yield call(handleToast, response.data.message || 'Clinic deleted successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(deleteClinicSuccess(action.payload.clinicId));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Clinic deletion failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(deleteClinicFailure(error.response.data.error));
    }
}

function* updateClinicSaga(action: Actions): any {
    try {
        const response = yield call(clinicApi.updateClinic, action.payload);
        yield call(handleToast, response.data.message || 'Clinic updated successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(updateClinicSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Clinic update failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(updateClinicFailure(error.response.data.error));
    }
}

function* getClinicDetailsSaga(action: Actions): any {
    try {
        const response = yield call(clinicApi.getClinicDetailsWithDoctors, action.payload.clinicId);
        yield call(handleToast, response.data.message || 'Clinic details fetched successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(getClinicDetailsSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Clinic details fetching failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(getClinicDetailsFailure(error.response.data.error));
    }
}

function* getAllClinicSagas(action: Actions): any {
    try {
        const response = yield call(clinicApi.getAllClinics);
        
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(getAllClinicSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Clinic details fetching failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(getAllClinicFailure(error.response.data.error));
    }
}


export default function* clinicSagas() {
    yield takeLatest(REGISTER_CLINIC_REQUEST, registerClinicSaga);
    yield takeLatest(DELETE_CLINIC_REQUEST, deleteClinicSaga);
    yield takeLatest(UPDATE_CLINIC_REQUEST, updateClinicSaga);
    yield takeLatest(GET_CLINIC_DETAILS_REQUEST, getClinicDetailsSaga);
    yield takeLatest(GET_ALL_CLINIC_REQUEST, getAllClinicSagas);
}
