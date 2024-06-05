import { SET_LOADING, LoadingActionTypes } from '../types/loadingTypes';

export const setLoading = (isLoading: boolean): LoadingActionTypes => ({
  type: SET_LOADING,
  payload: isLoading,
});
