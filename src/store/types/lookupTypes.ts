
export const CREATE_LOOKUP_REQUEST = 'CREATE_LOOKUP_REQUEST';
export const CREATE_LOOKUP_SUCCESS = 'CREATE_LOOKUP_SUCCESS';
export const CREATE_LOOKUP_FAILURE = 'CREATE_LOOKUP_FAILURE';

export const CREATE_LOOKUP_IN_CATEGORY_REQUEST = 'CREATE_LOOKUP_IN_CATEGORY_REQUEST';
export const CREATE_LOOKUP_IN_CATEGORY_SUCCESS = 'CREATE_LOOKUP_IN_CATEGORY_SUCCESS';
export const CREATE_LOOKUP_IN_CATEGORY_FAILURE = 'CREATE_LOOKUP_IN_CATEGORY_FAILURE';

export const GET_LOOKUPS_REQUEST = 'GET_LOOKUPS_REQUEST';
export const GET_LOOKUPS_SUCCESS = 'GET_LOOKUPS_SUCCESS';
export const GET_LOOKUPS_FAILURE = 'GET_LOOKUPS_FAILURE';

export const GET_LOOKUPS_BY_CATEGORY_REQUEST = 'GET_LOOKUPS_BY_CATEGORY_REQUEST';
export const GET_LOOKUPS_BY_CATEGORY_SUCCESS = 'GET_LOOKUPS_BY_CATEGORY_SUCCESS';
export const GET_LOOKUPS_BY_CATEGORY_FAILURE = 'GET_LOOKUPS_BY_CATEGORY_FAILURE';

export const GET_LOOKUPS_BY_PARENT_REQUEST = 'GET_LOOKUPS_BY_PARENT_REQUEST';
export const GET_LOOKUPS_BY_PARENT_SUCCESS = 'GET_LOOKUPS_BY_PARENT_SUCCESS';
export const GET_LOOKUPS_BY_PARENT_FAILURE = 'GET_LOOKUPS_BY_PARENT_FAILURE';

export const DELETE_LOOKUP_REQUEST = 'DELETE_LOOKUP_REQUEST';
export const DELETE_LOOKUP_SUCCESS = 'DELETE_LOOKUP_SUCCESS';
export const DELETE_LOOKUP_FAILURE = 'DELETE_LOOKUP_FAILURE';

export const UPDATE_LOOKUP_REQUEST = 'UPDATE_LOOKUP_REQUEST';
export const UPDATE_LOOKUP_SUCCESS = 'UPDATE_LOOKUP_SUCCESS';
export const UPDATE_LOOKUP_FAILURE = 'UPDATE_LOOKUP_FAILURE';


export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';



interface CreateLookupRequestAction {
    type: typeof CREATE_LOOKUP_REQUEST;
    payload: any; 
}

interface CreateLookupSuccessAction {
    type: typeof CREATE_LOOKUP_SUCCESS;
    payload: any; 
}

interface CreateLookupFailureAction {
    type: typeof CREATE_LOOKUP_FAILURE;
    error: string; 
}

interface CreateLookupInCategoryRequestAction {
    type: typeof CREATE_LOOKUP_IN_CATEGORY_REQUEST;
    payload: {
        category: string;
        data: any; 
    };
}

interface CreateLookupInCategorySuccessAction {
    type: typeof CREATE_LOOKUP_IN_CATEGORY_SUCCESS;
    payload: any; 
}

interface CreateLookupInCategoryFailureAction {
    type: typeof CREATE_LOOKUP_IN_CATEGORY_FAILURE;
    error: string; 
}

interface GetLookupsRequestAction {
    type: typeof GET_LOOKUPS_REQUEST;
}

interface GetLookupsSuccessAction {
    type: typeof GET_LOOKUPS_SUCCESS;
    payload: any[]; 
}

interface GetLookupsFailureAction {
    type: typeof GET_LOOKUPS_FAILURE;
    error: string; 
}

interface GetLookupsByCategoryRequestAction {
    type: typeof GET_LOOKUPS_BY_CATEGORY_REQUEST;
    payload: string; 
}

interface GetLookupsByCategorySuccessAction {
    type: typeof GET_LOOKUPS_BY_CATEGORY_SUCCESS;
    payload: any[]; 
}

interface GetLookupsByCategoryFailureAction {
    type: typeof GET_LOOKUPS_BY_CATEGORY_FAILURE;
    error: string; 
}

interface GetLookupsByParentRequestAction {
    type: typeof GET_LOOKUPS_BY_PARENT_REQUEST;
    payload: string; 
}

interface GetLookupsByParentSuccessAction {
    type: typeof GET_LOOKUPS_BY_PARENT_SUCCESS;
    payload: any[]; 
}

interface GetLookupsByParentFailureAction {
    type: typeof GET_LOOKUPS_BY_PARENT_FAILURE;
    error: string; 
}

interface DeleteLookupRequestAction {
    type: typeof DELETE_LOOKUP_REQUEST;
    payload: string; 
}

interface DeleteLookupSuccessAction {
    type: typeof DELETE_LOOKUP_SUCCESS;
    payload: string; 
}

interface DeleteLookupFailureAction {
    type: typeof DELETE_LOOKUP_FAILURE;
    error: string; 
}

interface UpdateLookupRequestAction {
    type: typeof UPDATE_LOOKUP_REQUEST;
    payload: {
        id: string;
        data: any; 
    };
}

interface UpdateLookupSuccessAction {
    type: typeof UPDATE_LOOKUP_SUCCESS;
    payload: any; 
}

interface UpdateLookupFailureAction {
    type: typeof UPDATE_LOOKUP_FAILURE;
    error: string; 
}



interface CreateCategoryRequestAction {
    type: typeof CREATE_CATEGORY_REQUEST;
    payload: any; 
}

interface CreateCategorySuccessAction {
    type: typeof CREATE_CATEGORY_SUCCESS;
    payload: any; 
}

interface CreateCategoryFailureAction {
    type: typeof CREATE_CATEGORY_FAILURE;
    error: string; 
}

interface GetCategoriesRequestAction {
    type: typeof GET_CATEGORIES_REQUEST;
}

interface GetCategoriesSuccessAction {
    type: typeof GET_CATEGORIES_SUCCESS;
    payload: any[]; 
}

interface GetCategoriesFailureAction {
    type: typeof GET_CATEGORIES_FAILURE;
    error: string; 
}

interface UpdateCategoryRequestAction {
    type: typeof UPDATE_CATEGORY_REQUEST;
    payload: {
        id: string;
        data: any; 
    };
}

interface UpdateCategorySuccessAction {
    type: typeof UPDATE_CATEGORY_SUCCESS;
    payload: any; 
}

interface UpdateCategoryFailureAction {
    type: typeof UPDATE_CATEGORY_FAILURE;
    error: string; 
}

interface DeleteCategoryRequestAction {
    type: typeof DELETE_CATEGORY_REQUEST;
    payload: string; 
}

interface DeleteCategorySuccessAction {
    type: typeof DELETE_CATEGORY_SUCCESS;
    payload: string; 
}

interface DeleteCategoryFailureAction {
    type: typeof DELETE_CATEGORY_FAILURE;
    error: string; 
}


export type LookupActionTypes =
    | CreateLookupRequestAction
    | CreateLookupSuccessAction
    | CreateLookupFailureAction
    | CreateLookupInCategoryRequestAction
    | CreateLookupInCategorySuccessAction
    | CreateLookupInCategoryFailureAction
    | GetLookupsRequestAction
    | GetLookupsSuccessAction
    | GetLookupsFailureAction
    | GetLookupsByCategoryRequestAction
    | GetLookupsByCategorySuccessAction
    | GetLookupsByCategoryFailureAction
    | GetLookupsByParentRequestAction
    | GetLookupsByParentSuccessAction
    | GetLookupsByParentFailureAction
    | DeleteLookupRequestAction
    | DeleteLookupSuccessAction
    | DeleteLookupFailureAction
    | UpdateLookupRequestAction
    | UpdateLookupSuccessAction
    | UpdateLookupFailureAction
    | CreateCategoryRequestAction
    | CreateCategorySuccessAction
    | CreateCategoryFailureAction
    | GetCategoriesRequestAction
    | GetCategoriesSuccessAction
    | GetCategoriesFailureAction
    | UpdateCategoryRequestAction
    | UpdateCategorySuccessAction
    | UpdateCategoryFailureAction
    | DeleteCategoryRequestAction
    | DeleteCategorySuccessAction
    | DeleteCategoryFailureAction;
