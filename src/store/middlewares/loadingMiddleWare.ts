import { Middleware } from 'redux';
import { setLoading } from '../actions/loadingActions';
import { RootState } from '../reducers';

const loadingMiddleware: Middleware<{}, RootState> = store => next => action => {
  console.log(action);
  
  const isAsyncAction = action.type.endsWith('_REQUEST') || action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE');

  if (isAsyncAction) {
    store.dispatch(setLoading(true));
  }

  const result = next(action);

  if (isAsyncAction) {
    store.dispatch(setLoading(false));
  }

  return result;
};

export default loadingMiddleware;
