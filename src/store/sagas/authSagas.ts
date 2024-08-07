import { takeLatest, put, call } from 'redux-saga/effects';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  verifyOtpSuccess,
  verifyOtpFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  registerAdminSuccess,
  registerAdminFailure,
  registerDoctorSuccess,
  registerDoctorFailure,
} from '../actions/authActions';
import { Actions, CallbackFunctions } from '../../shared/models/Actions';
import authApi from '../../shared/api/authApi';
import { FORGOT_PASSWORD_REQUEST, LOGIN_USER_REQUEST, REGISTER_ADMIN_REQUEST, REGISTER_DOCTOR_REQUEST, REGISTER_PATIENT_REQUEST, RESET_PASSWORD_REQUEST, VERIFY_OTP_REQUEST } from '../types/authTypes';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'MEDIMANAGE-AUTH'

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

function encryptBody(obj: any){
  return CryptoJS.AES.encrypt(JSON.stringify(obj), SECRET_KEY).toString();
}

function* loginSaga(action: Actions): any {
  try {
    const { email, password } = action.payload;
    const encryptedBody = encryptBody({ email, password })
    const response = yield call(authApi.login, encryptedBody);
    yield call(handleToast, response.data.message || response.data.data.message || 'Login successful. Otp sent.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
    yield put(loginSuccess(response.data.verify_user, email));
  } catch (error: any) {
    yield call(handleToast, error.response.data.error || error.response.data.message || 'Login failed. Please try again.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
    yield put(loginFailure(error.response.data.error));
  }
}

function* registerAdminSaga(action: Actions) {
  try {
    const userData = action.payload;
    yield call(authApi.registerAdmin, userData);
    yield call(handleToast, 'Registration successful.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
    yield put(registerAdminSuccess());
  } catch (error: any) {
    yield call(handleToast, error.response.data.error || error.response.data.message || 'Registration failed. Please try again.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
    yield put(registerAdminFailure(error.message));
  }
}

function* registerDoctorSaga(action: Actions) {
  try {
    const userData = action.payload;
    yield call(authApi.registerDoctor, userData);
    yield call(handleToast, 'Registration successful.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
    yield put(registerDoctorSuccess());
  } catch (error: any) {
    yield call(handleToast, error.response.data.error || error.response.data.message || 'Registration failed. Please try again.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
    yield put(registerDoctorFailure(error.message));
  }
}


function* registerPatientSaga(action: Actions) {
  try {
    const userData = action.payload;
    const encryptedBody = encryptBody(userData)
    yield call(authApi.registerPatient, encryptedBody);
    yield call(handleToast, 'Registration successful.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
    yield put(registerSuccess());
  } catch (error: any) {
    yield call(handleToast, error.response.data.error || error.response.data.message || 'Registration failed. Please try again.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
    yield put(registerFailure(error.message));
  }
}

function* verifyOtpSaga(action: Actions): any {
  try {
    const { otp, email } = action.payload;
    const response = yield call(authApi.verifyOtp, otp, email);
    yield call(handleToast, 'Otp verified. Login successful', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', response.data.role);
    yield put(verifyOtpSuccess(response.data.token, response.data.role, response.data.name));
  } catch (error: any) {
    yield call(handleToast, error?.response?.data?.error || error?.response?.data?.message || `Otp verification failed. Please try again. Error: ${error.stack}`, 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
    yield put(verifyOtpFailure(error.message));
  }
}

function* forgotPasswordSaga(action: Actions): any {
  try {
    const { email } = action.payload;
    const response = yield call(authApi.forgotPassword, email);
    yield call(handleToast, response.data.message || response.data.data.message || 'Email has been sent to you.', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
    yield put(forgotPasswordSuccess(response.success));
  } catch (error: any) {
    yield call(handleToast, error.response.data.error || error.response.data.message || 'Login failed. Please try again.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
    yield put(forgotPasswordFailure(error.message));
  }
}

function* resetPasswordSaga(action: Actions): any {
  try {
    const { token, newPassword } = action.payload;
    const encryptedBody = encryptBody({token, newPassword})
    const response = yield call(authApi.resetPassword, encryptedBody);
    yield call(handleToast, response.data.message || response.data.data.message || 'Password reset successful. Please Login now', 'success');
    yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
    yield put(resetPasswordSuccess(response.success));
  } catch (error: any) {
    yield call(handleToast, error.response.data.error || error.response.data.message || 'Password reset failed. Please try again.', 'error');
    yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
    yield put(resetPasswordFailure(error.message));
  }
}


export default function* authSaga() {
  yield takeLatest(LOGIN_USER_REQUEST, loginSaga);
  yield takeLatest(REGISTER_PATIENT_REQUEST, registerPatientSaga);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
  yield takeLatest(REGISTER_ADMIN_REQUEST, registerAdminSaga);
  yield takeLatest(REGISTER_DOCTOR_REQUEST, registerDoctorSaga);

}
