import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import thunk from 'redux-thunk';
import loadingMiddleware from './middlewares/loadingMiddleWare';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: {
      ignoredActionPaths: ['callbacks'],
      ignoredPaths: ['action.callbacks', 'callbacks.onCallSuccess', 'callbacks.onCallFailure'],
    }}).concat(sagaMiddleware, thunk,loadingMiddleware),
});

sagaMiddleware.run(rootSaga);
export default store;
