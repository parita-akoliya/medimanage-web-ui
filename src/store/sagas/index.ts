import { all } from 'redux-saga/effects';
import authSaga from './authSagas';
import profileSagas from './profileSagas';
import adminUserSagas from './userSagas';
import clinicSagas from './clinicSagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSagas(),
    adminUserSagas(),
    clinicSagas(),
  ]);
}
