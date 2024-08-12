import { takeLatest, put, call } from 'redux-saga/effects';
import {
    createLookupSuccess,
    createLookupFailure,
    createLookupInCategorySuccess,
    createLookupInCategoryFailure,
    getLookupsSuccess,
    getLookupsFailure,
    getLookupsByCategorySuccess,
    getLookupsByCategoryFailure,
    getLookupsByParentSuccess,
    getLookupsByParentFailure,
    deleteLookupSuccess,
    deleteLookupFailure,
    updateLookupSuccess,
    updateLookupFailure,
    createCategorySuccess,
    createCategoryFailure,
    getCategoriesSuccess,
    getCategoriesFailure,
    updateCategorySuccess,
    updateCategoryFailure,
    deleteCategorySuccess,
    deleteCategoryFailure
} from '../actions/lookupActions';
import {
    CREATE_LOOKUP_REQUEST,
    CREATE_LOOKUP_IN_CATEGORY_REQUEST,
    GET_LOOKUPS_REQUEST,
    GET_LOOKUPS_BY_CATEGORY_REQUEST,
    GET_LOOKUPS_BY_PARENT_REQUEST,
    DELETE_LOOKUP_REQUEST,
    UPDATE_LOOKUP_REQUEST,
    CREATE_CATEGORY_REQUEST,
    GET_CATEGORIES_REQUEST,
    UPDATE_CATEGORY_REQUEST,
    DELETE_CATEGORY_REQUEST
} from '../types/lookupTypes';
import { toast } from 'react-toastify';
import lookupApi from '../../shared/api/lookupApi';
import { Actions, CallbackFunctions } from '../../shared/models/Actions';


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




function* createLookupSaga(action: Actions): Generator<any, void, any> {
    const { data, callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.createLookup, data);
        yield call(handleToast, response.data.message || 'Lookup created successfully.', 'success');
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(createLookupSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to create lookup. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(createLookupFailure(error.message));
    }
}


function* createLookupInCategorySaga(action: Actions): Generator<any, void, any> {
    const { category, data, callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.createLookupInCategory, category, data);
        yield call(handleToast, response.data.message || 'Lookup created in category successfully.', 'success');
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(createLookupInCategorySuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to create lookup in category. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(createLookupInCategoryFailure(error.message));
    }
}


function* getLookupsSaga(action: Actions): Generator<any, void, any> {
    const { callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.getLookups);
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(getLookupsSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to fetch lookups. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(getLookupsFailure(error.message));
    }
}


function* getLookupsByCategorySaga(action: Actions): Generator<any, void, any> {
    const { category, callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.getLookupsByCategory, category);
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(getLookupsByCategorySuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to fetch lookups by category. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(getLookupsByCategoryFailure(error.message));
    }
}


function* getLookupsByParentSaga(action: Actions): Generator<any, void, any> {
    const { parentId, callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.getLookupsByParent, parentId);
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(getLookupsByParentSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to fetch lookups by parent. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(getLookupsByParentFailure(error.message));
    }
}


function* deleteLookupSaga(action: Actions): Generator<any, void, any> {
    const { id, callbacks } = action.payload;
    try {
        yield call(lookupApi.deleteLookup, id);
        yield call(handleToast, 'Lookup deleted successfully.', 'success');
        yield* handleCallbacks(callbacks, 'onCallSuccess', id);
        yield put(deleteLookupSuccess(id));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to delete lookup. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(deleteLookupFailure(error.message));
    }
}


function* updateLookupSaga(action: Actions): Generator<any, void, any> {
    const { id, data, callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.updateLookup, id, data);
        yield call(handleToast, 'Lookup updated successfully.', 'success');
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(updateLookupSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to update lookup. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(updateLookupFailure(error.message));
    }
}




function* createCategorySaga(action: Actions): Generator<any, void, any> {
    const { data, callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.createLookupCategory, data);
        yield call(handleToast, response.data.message || 'Category created successfully.', 'success');
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(createCategorySuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to create category. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(createCategoryFailure(error.message));
    }
}


function* getCategoriesSaga(action: Actions): Generator<any, void, any> {
    const { callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.getAllCategories);
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(getCategoriesSuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to fetch categories. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(getCategoriesFailure(error.message));
    }
}


function* updateCategorySaga(action: Actions): Generator<any, void, any> {
    const { id, data, callbacks } = action.payload;
    try {
        const response = yield call(lookupApi.updateLookupCategory, id, data);
        yield call(handleToast, 'Category updated successfully.', 'success');
        yield* handleCallbacks(callbacks, 'onCallSuccess', response.data);
        yield put(updateCategorySuccess(response.data));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to update category. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(updateCategoryFailure(error.message));
    }
}


function* deleteCategorySaga(action: Actions): Generator<any, void, any> {
    const { id, callbacks } = action.payload;
    try {
        yield call(lookupApi.deleteLookupCategory, id);
        yield call(handleToast, 'Category deleted successfully.', 'success');
        yield* handleCallbacks(callbacks, 'onCallSuccess', id);
        yield put(deleteCategorySuccess(id));
    } catch (error: any) {
        yield call(handleToast, error.response?.data?.error || 'Failed to delete category. Please try again.', 'error');
        yield* handleCallbacks(callbacks, 'onCallFailure', error.message);
        yield put(deleteCategoryFailure(error.message));
    }
}


export default function* lookupSagas() {
    yield takeLatest(CREATE_LOOKUP_REQUEST, createLookupSaga);
    yield takeLatest(CREATE_LOOKUP_IN_CATEGORY_REQUEST, createLookupInCategorySaga);
    yield takeLatest(GET_LOOKUPS_REQUEST, getLookupsSaga);
    yield takeLatest(GET_LOOKUPS_BY_CATEGORY_REQUEST, getLookupsByCategorySaga);
    yield takeLatest(GET_LOOKUPS_BY_PARENT_REQUEST, getLookupsByParentSaga);
    yield takeLatest(DELETE_LOOKUP_REQUEST, deleteLookupSaga);
    yield takeLatest(UPDATE_LOOKUP_REQUEST, updateLookupSaga);
    yield takeLatest(CREATE_CATEGORY_REQUEST, createCategorySaga);
    yield takeLatest(GET_CATEGORIES_REQUEST, getCategoriesSaga);
    yield takeLatest(UPDATE_CATEGORY_REQUEST, updateCategorySaga);
    yield takeLatest(DELETE_CATEGORY_REQUEST, deleteCategorySaga);
}
