import { all } from 'redux-saga/effects';
import authSaga from './authSagas';
import profileSagas from './profileSagas';
import adminUserSagas from './userSagas';
import clinicSagas from './clinicSagas';
import clientSagas from './clientSagas';
import doctorSagas from './doctorSagas';
import lookupSagas from './lookupSagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSagas(),
    adminUserSagas(),
    clinicSagas(),
    clientSagas(),
    doctorSagas(),
    lookupSagas()
  ]);
}
