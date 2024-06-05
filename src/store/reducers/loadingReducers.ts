import { SET_LOADING, LoadingActionTypes, LoadingState } from '../types/loadingTypes';

const initialState: LoadingState = {
  isLoading: false,
};

const loading = (state = initialState, action: LoadingActionTypes): LoadingState => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default loading;
