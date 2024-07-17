import { takeLatest, put, call } from 'redux-saga/effects';
import { Actions, CallbackFunctions } from '../../shared/models/Actions';
import { toast } from 'react-toastify';
import {
    CHANGE_ROLE_REQUEST,
    DELETE_USER_REQUEST,
    GET_ALL_USERS_REQUEST,
    GET_USER_REQUEST,
    RESET_PASSWORD_REQUEST,
    UPDATE_EMAIL_REQUEST,
    UPDATE_USER_REQUEST,
} from '../types/userTypes';
import userApi from '../../shared/api/userApi';
import { changeRoleFailure, changeRoleSuccess, deleteUserFailure, deleteUserRequest, getAllUsersFailure, getAllUsersSuccess, getUserFailure, getUserSuccess, resetPasswordFailure, resetPasswordSuccess, updateEmailFailure, updateEmailSuccess, updateUserFailure, updateUserSuccess } from '../actions/userActions';

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

function* changeRoleSaga(action: Actions): any {
    try {
        const response = yield call(userApi.changeUserRole, action.payload);
        yield call(handleToast, response.data.message || 'Role changed successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(changeRoleSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Failed to change role. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(changeRoleFailure(error.response.data.error));
    }
}

function* updateEmailSaga(action: Actions): any {
    try {
        const response = yield call(userApi.updateEmail, action.payload);
        yield call(handleToast, response.data.message || 'Email updated successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(updateEmailSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Failed to update email. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(updateEmailFailure(error.response.data.error));
    }
}

function* resetPasswordSaga(action: Actions): any {
    try {
        const response = yield call(userApi.resetPassword, {email:action.payload});
        yield call(handleToast, response.data.message || 'Password reset successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(resetPasswordSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Failed to reset password. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(resetPasswordFailure(error.response.data.error));
    }
}

function* getUserSaga(action: Actions): any {
    try {
        const response = yield call(userApi.getUser, action.payload);
        yield call(handleToast, response.data.message || 'User fetched successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(getUserSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Failed to fetch user details. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(getUserFailure(error.response.data.error));
    }
}

function* deleteUserSaga(action: Actions): any {
    try {
        const response = yield call(userApi.deleteUser, action.payload);
        yield call(handleToast, response.data.message || 'User deleted successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(deleteUserRequest(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Failed to delete user. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(deleteUserFailure(error.response.data.error));
    }
}

function* getAllUsersSaga(action: Actions): any {
    try {
        const response = yield call(userApi.getAllUsers);
        // yield call(handleToast, response.data.message || 'Users fetched successfully.', 'success');
        yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
        yield put(getAllUsersSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response.data.error || 'Failed to fetch users. Please try again.', 'error');
        yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
        yield put(getAllUsersFailure(error.response.data.error));
    }
}

function* updateUsersSaga(action: Actions): any {
  try {
      const response = yield call(userApi.updateUser, action.payload.userId, action.payload.userData);
      yield call(handleToast, response.data.message || 'Users updated successfully.', 'success');
      yield* handleCallbacks(action.callbacks, 'onCallSuccess', 'success');
      yield put(updateUserSuccess(response.data));
  } catch (error: any) {
      yield call(handleToast, error.response.data.error || 'Failed to update users. Please try again.', 'error');
      yield* handleCallbacks(action.callbacks, 'onCallFailure', 'failure');
      yield put(updateUserFailure(error.response.data.error));
  }
}


export default function* adminUserSagas() {
    yield takeLatest(CHANGE_ROLE_REQUEST, changeRoleSaga);
    yield takeLatest(UPDATE_EMAIL_REQUEST, updateEmailSaga);
    yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
    yield takeLatest(GET_USER_REQUEST, getUserSaga);
    yield takeLatest(DELETE_USER_REQUEST, deleteUserSaga);
    yield takeLatest(GET_ALL_USERS_REQUEST, getAllUsersSaga);
    yield takeLatest(UPDATE_USER_REQUEST, updateUsersSaga);
}
