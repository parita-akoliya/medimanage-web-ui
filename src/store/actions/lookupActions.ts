import {
    CREATE_LOOKUP_REQUEST,
    CREATE_LOOKUP_SUCCESS,
    CREATE_LOOKUP_FAILURE,
    CREATE_LOOKUP_IN_CATEGORY_REQUEST,
    CREATE_LOOKUP_IN_CATEGORY_SUCCESS,
    CREATE_LOOKUP_IN_CATEGORY_FAILURE,
    GET_LOOKUPS_REQUEST,
    GET_LOOKUPS_SUCCESS,
    GET_LOOKUPS_FAILURE,
    GET_LOOKUPS_BY_CATEGORY_REQUEST,
    GET_LOOKUPS_BY_CATEGORY_SUCCESS,
    GET_LOOKUPS_BY_CATEGORY_FAILURE,
    GET_LOOKUPS_BY_PARENT_REQUEST,
    GET_LOOKUPS_BY_PARENT_SUCCESS,
    GET_LOOKUPS_BY_PARENT_FAILURE,
    DELETE_LOOKUP_REQUEST,
    DELETE_LOOKUP_SUCCESS,
    DELETE_LOOKUP_FAILURE,
    UPDATE_LOOKUP_REQUEST,
    UPDATE_LOOKUP_SUCCESS,
    UPDATE_LOOKUP_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE
} from '../types/lookupTypes';


export const createLookupRequest = (
    data: any,
    onCallSuccess?: Function | void ,
    onCallFail?: Function | void 
) => ({
    type: CREATE_LOOKUP_REQUEST,
    payload: { data, callbacks: { onCallSuccess, onCallFail } }
});

export const createLookupSuccess = (data: any) => ({
    type: CREATE_LOOKUP_SUCCESS,
    payload: data
});

export const createLookupFailure = (error: string) => ({
    type: CREATE_LOOKUP_FAILURE,
    error
});


export const createLookupInCategoryRequest = (
    category: string,
    data: any,
    onCallSuccess?: Function | void ,
    onCallFail?: Function | void 
) => ({
    type: CREATE_LOOKUP_IN_CATEGORY_REQUEST,
    payload: { category, data, callbacks: { onCallSuccess, onCallFail } }
});

export const createLookupInCategorySuccess = (data: any) => ({
    type: CREATE_LOOKUP_IN_CATEGORY_SUCCESS,
    payload: data
});

export const createLookupInCategoryFailure = (error: string) => ({
    type: CREATE_LOOKUP_IN_CATEGORY_FAILURE,
    error
});


export const getLookupsRequest = (
    onCallSuccess?: (data: any[]) => void,
    onCallFail?: Function | void 
) => ({
    type: GET_LOOKUPS_REQUEST,
    payload: { callbacks: { onCallSuccess, onCallFail } }
});

export const getLookupsSuccess = (data: any[]) => ({
    type: GET_LOOKUPS_SUCCESS,
    payload: data
});

export const getLookupsFailure = (error: string) => ({
    type: GET_LOOKUPS_FAILURE,
    error
});


export const getLookupsByCategoryRequest = (
    category: string,
    onCallSuccess?: (data: any[]) => void,
    onCallFail?: Function | void 
) => ({
    type: GET_LOOKUPS_BY_CATEGORY_REQUEST,
    payload: { category, callbacks: { onCallSuccess, onCallFail } }
});

export const getLookupsByCategorySuccess = (data: any[]) => ({
    type: GET_LOOKUPS_BY_CATEGORY_SUCCESS,
    payload: data
});

export const getLookupsByCategoryFailure = (error: string) => ({
    type: GET_LOOKUPS_BY_CATEGORY_FAILURE,
    error
});


export const getLookupsByParentRequest = (
    parentId: string,
    onCallSuccess?: Function | void,
    onCallFail?: Function | void 
) => ({
    type: GET_LOOKUPS_BY_PARENT_REQUEST,
    payload: { parentId, callbacks: { onCallSuccess, onCallFail } }
});

export const getLookupsByParentSuccess = (data: any[]) => ({
    type: GET_LOOKUPS_BY_PARENT_SUCCESS,
    payload: data
});

export const getLookupsByParentFailure = (error: string) => ({
    type: GET_LOOKUPS_BY_PARENT_FAILURE,
    error
});


export const deleteLookupRequest = (
    id: string,
    onCallSuccess?: Function | void,
    onCallFail?: Function | void 
) => ({
    type: DELETE_LOOKUP_REQUEST,
    payload: { id, callbacks: { onCallSuccess, onCallFail } }
});

export const deleteLookupSuccess = (id: string) => ({
    type: DELETE_LOOKUP_SUCCESS,
    payload: id
});

export const deleteLookupFailure = (error: string) => ({
    type: DELETE_LOOKUP_FAILURE,
    error
});


export const updateLookupRequest = (
    id: string,
    data: any,
    onCallSuccess?: Function | void ,
    onCallFail?: Function | void 
) => ({
    type: UPDATE_LOOKUP_REQUEST,
    payload: { id, data, callbacks: { onCallSuccess, onCallFail } }
});

export const updateLookupSuccess = (data: any) => ({
    type: UPDATE_LOOKUP_SUCCESS,
    payload: data
});

export const updateLookupFailure = (error: string) => ({
    type: UPDATE_LOOKUP_FAILURE,
    error
});


export const createCategoryRequest = (
    data: any,
    onCallSuccess?: Function | void ,
    onCallFail?: Function | void 
) => ({
    type: CREATE_CATEGORY_REQUEST,
    payload: { data, callbacks: { onCallSuccess, onCallFail } }
});

export const createCategorySuccess = (data: any) => ({
    type: CREATE_CATEGORY_SUCCESS,
    payload: data
});

export const createCategoryFailure = (error: string) => ({
    type: CREATE_CATEGORY_FAILURE,
    error
});


export const getCategoriesRequest = (
    onCallSuccess?: (data: any[]) => void,
    onCallFail?: Function | void 
) => ({
    type: GET_CATEGORIES_REQUEST,
    payload: { callbacks: { onCallSuccess, onCallFail } }
});

export const getCategoriesSuccess = (data: any[]) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: data
});

export const getCategoriesFailure = (error: string) => ({
    type: GET_CATEGORIES_FAILURE,
    error
});


export const updateCategoryRequest = (
    id: string,
    data: any,
    onCallSuccess?: Function | void ,
    onCallFail?: Function | void 
) => ({
    type: UPDATE_CATEGORY_REQUEST,
    payload: { id, data, callbacks: { onCallSuccess, onCallFail } }
});

export const updateCategorySuccess = (data: any) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: data
});

export const updateCategoryFailure = (error: string) => ({
    type: UPDATE_CATEGORY_FAILURE,
    error
});


export const deleteCategoryRequest = (
    id: string,
    onCallSuccess?: Function | void,
    onCallFail?: Function | void 
) => ({
    type: DELETE_CATEGORY_REQUEST,
    payload: { id, callbacks: { onCallSuccess, onCallFail } }
});

export const deleteCategorySuccess = (id: string) => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: id
});

export const deleteCategoryFailure = (error: string) => ({
    type: DELETE_CATEGORY_FAILURE,
    error
});
