import { combineReducers } from 'redux';
import auth, { AuthState } from './authReducers';
import loading from './loadingReducers';
import { LoadingState } from '../types/loadingTypes';
import user from './userReducers';
import profile from './profileReducers';
import clinic from './clinicReducers';
import doctors from './doctorReducers';

export interface RootState {
    auth: AuthState;
    loading: LoadingState
}

const rootReducer = combineReducers({
    auth,
    user,
    profile,
    loading,
    clinic,
    doctors
});

export default rootReducer;
