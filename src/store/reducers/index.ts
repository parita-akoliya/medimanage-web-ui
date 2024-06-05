import { combineReducers } from 'redux';
import auth, { AuthState } from './authReducers';
import loading from './loadingReducers';
import { LoadingState } from '../types/loadingTypes';

export interface RootState {
    auth: AuthState;
    loading: LoadingState
}

const rootReducer = combineReducers({
    auth,
    loading,
});

export default rootReducer;
