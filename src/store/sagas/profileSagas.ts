import { takeLatest, put, call } from 'redux-saga/effects';
import { Actions, CallbackFunctions } from '../../shared/models/Actions';
import { toast } from 'react-toastify';
import profileApi from '../../shared/api/profileApi';
import { getProfileFailure, getProfileSuccess, updateProfileFailure, updateProfileSuccess } from '../actions/profileActions';
import { GET_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST } from '../types/profileTypes';


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

function* getProfileSaga(action: Actions): any {
    try {
        const response = yield call(profileApi.getProfile);
        // yield call(handleToast, response?.data?.message || response?.data?.data?.message || 'Data fetched successful.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(getProfileSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || error.response.data.message || 'Profile fetching failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(getProfileFailure(error.response.data.error));
    }
}

function* updateProfileSaga(action: Actions): any {
    try {
        const response = yield call(profileApi.updateProfile, action.payload);
        yield call(handleToast, response?.data?.message || response?.data?.data?.message || 'Data updated successful.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(updateProfileSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || error.response.data.message || 'Profile updating failed. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(updateProfileFailure(error.response.data.error));
    }
}


export default function* profileSagas() {
    yield takeLatest(GET_PROFILE_REQUEST, getProfileSaga);
    yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileSaga);
}
