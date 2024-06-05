export const SET_LOADING = 'SET_LOADING';

export interface LoadingState {
  isLoading: boolean;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type LoadingActionTypes = SetLoadingAction;
