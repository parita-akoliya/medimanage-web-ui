import { takeLatest, put, call } from 'redux-saga/effects';
import {
  getAllDoctorsSuccess,
  getAllDoctorsFailure,
  getDoctorSuccess,
  getDoctorFailure,
  deleteDoctorSuccess,
  deleteDoctorFailure,
  updateDoctorSuccess,
  updateDoctorFailure,
  getDoctorByClinicIdSuccess,
  getDoctorByClinicIdFailure,
} from '../actions/doctorActions';
import { Actions, CallbackFunctions } from '../../shared/models/Actions';
import {
  GET_ALL_DOCTORS_REQUEST,
  GET_DOCTOR_REQUEST,
  DELETE_DOCTOR_REQUEST,
  UPDATE_DOCTOR_REQUEST,
  GET_DOCTOR_BY_CLINIC_ID_REQUEST,
} from '../types/doctorTypes';
import { toast } from 'react-toastify';
import doctorApi from '../../shared/api/doctorApi';

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

function* getAllDoctorsSaga(action: Actions): any {
  try {
    const response = yield call(doctorApi.getAllDoctors);
    // yield call(handleToast, 'Doctors retrieved successfully.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
    yield put(getAllDoctorsSuccess(response.data));
  } catch (error: any) {
    yield call(handleToast, error.response?.data?.error || 'Failed to retrieve doctors.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', error);
    yield put(getAllDoctorsFailure(error.message));
  }
}

function* getDoctorSaga(action: Actions): any {
  try {
    const response = yield call(doctorApi.getDoctor, action.payload);
    // yield call(handleToast, 'Doctor retrieved successfully.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
    yield put(getDoctorSuccess(response.data));
  } catch (error: any) {
    yield call(handleToast, error.response?.data?.error || 'Failed to retrieve doctor.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', error);
    yield put(getDoctorFailure(error.message));
  }
}

function* deleteDoctorSaga(action: Actions): any {
  try {
    yield call(doctorApi.deleteDoctor, action.payload);
    yield call(handleToast, 'Doctor deleted successfully.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', action.payload);
    yield put(deleteDoctorSuccess(action.payload));
  } catch (error: any) {
    yield call(handleToast, error.response?.data?.error || 'Failed to delete doctor.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', error);
    yield put(deleteDoctorFailure(error.message));
  }
}

function* updateDoctorSaga(action: Actions): any {
  try {
    const response = yield call(doctorApi.updateDoctor, action.payload);
    yield call(handleToast, 'Doctor updated successfully.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
    yield put(updateDoctorSuccess(response.data));
  } catch (error: any) {
    yield call(handleToast, error.response?.data?.error || 'Failed to update doctor.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', error);
    yield put(updateDoctorFailure(error.message));
  }
}

function* getDoctorByClinicIdSaga(action: Actions): any {
  try {
    const response = yield call(doctorApi.getDoctorByClinicId, action.payload);
    // yield call(handleToast, 'Doctor retrieved successfully.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data);
    yield put(getDoctorByClinicIdSuccess(response.data));
  } catch (error: any) {
    yield call(handleToast, error.response?.data?.error || 'Failed to retrieve doctor.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', error);
    yield put(getDoctorByClinicIdFailure(error.message));
  }
}


export default function* doctorSagas() {
  yield takeLatest(GET_ALL_DOCTORS_REQUEST, getAllDoctorsSaga);
  yield takeLatest(GET_DOCTOR_REQUEST, getDoctorSaga);
  yield takeLatest(DELETE_DOCTOR_REQUEST, deleteDoctorSaga);
  yield takeLatest(UPDATE_DOCTOR_REQUEST, updateDoctorSaga);
  yield takeLatest(GET_DOCTOR_BY_CLINIC_ID_REQUEST, getDoctorByClinicIdSaga);
}
