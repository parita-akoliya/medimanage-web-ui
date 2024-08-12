import {
    CREATE_LOOKUP_SUCCESS,
    CREATE_LOOKUP_FAILURE,
    CREATE_LOOKUP_IN_CATEGORY_SUCCESS,
    GET_LOOKUPS_SUCCESS,
    GET_LOOKUPS_FAILURE,
    GET_LOOKUPS_BY_CATEGORY_SUCCESS,
    GET_LOOKUPS_BY_CATEGORY_FAILURE,
    GET_LOOKUPS_BY_PARENT_SUCCESS,
    GET_LOOKUPS_BY_PARENT_FAILURE,
    DELETE_LOOKUP_SUCCESS,
    DELETE_LOOKUP_FAILURE,
    UPDATE_LOOKUP_SUCCESS,
    UPDATE_LOOKUP_FAILURE,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE
} from '../types/lookupTypes';

interface LookupState {
    lookupsByParent: Record<string, any[]>;
    lookupsByType: Record<string, any[]>;
    lookupsAll: any[];
    categories: { _id: string; name: string }[];
    lookupMaps: Record<string, string[]>; 
    error: string | null;
}

const initialState: LookupState = {
    lookupsByParent: {},
    lookupsByType: {},
    lookupsAll: [],
    categories: [],
    lookupMaps: {},
    error: null
};

const lookupData = (state = initialState, action: any): LookupState => {
    switch (action.type) {
        case CREATE_LOOKUP_SUCCESS:
        case CREATE_LOOKUP_IN_CATEGORY_SUCCESS:
            const newLookup = action.payload;
            
            return {
                ...state,
                lookupsAll: [...state.lookupsAll, newLookup],
                lookupsByParent: {
                    ...state.lookupsByParent,
                    [newLookup.parentId]: [
                        ...(state.lookupsByParent[newLookup.parentId] || []),
                        newLookup
                    ]
                },
                lookupsByType: {
                    ...state.lookupsByType,
                    [newLookup.type]: [
                        ...(state.lookupsByType[newLookup.type.name] || []),
                        newLookup
                    ]
                },
                lookupMaps: {
                    ...state.lookupMaps,
                    [newLookup.value]: [
                        ...(state.lookupMaps[newLookup.value] || []),
                        newLookup._id
                    ]
                },
                error: null
            };
        case CREATE_LOOKUP_FAILURE:
        case GET_LOOKUPS_FAILURE:
        case GET_LOOKUPS_BY_CATEGORY_FAILURE:
        case GET_LOOKUPS_BY_PARENT_FAILURE:
        case DELETE_LOOKUP_FAILURE:
        case UPDATE_LOOKUP_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case GET_LOOKUPS_SUCCESS:
            return {
                ...state,
                lookupsAll: action.payload,
                lookupsByParent: action.payload.reduce((acc: Record<string, any[]>, lookup: any) => {
                    if (!acc[lookup?.parentId?.value]) acc[lookup?.parentId?.value] = [];
                    acc[lookup?.parentId?.value].push(lookup);
                    return acc;
                }, {}),
                lookupsByType: action.payload.reduce((acc: Record<string, any[]>, lookup: any) => {                    
                    if (!acc[lookup.type.name]) acc[lookup.type.name] = [];
                    acc[lookup.type.name].push(lookup);
                    return acc;
                }, {}),
                lookupMaps: action.payload.reduce((acc: Record<string, string[]>, lookup: any) => {
                    if (!acc[lookup.value]) acc[lookup.value] = [];
                    acc[lookup.value].push(lookup._id);
                    return acc;
                }, {}),
                error: null
            };
        case GET_LOOKUPS_BY_CATEGORY_SUCCESS:
        case GET_LOOKUPS_BY_PARENT_SUCCESS:
            return {
                ...state,
                lookupsAll: action.payload,
                lookupsByParent: action.payload.reduce((acc: Record<string, any[]>, lookup: any) => {
                    if (!acc[lookup.parentId]) acc[lookup.parentId] = [];
                    acc[lookup.parentId].push(lookup);
                    return acc;
                }, {}),
                lookupsByType: action.payload.reduce((acc: Record<string, any[]>, lookup: any) => {
                    if (!acc[lookup.type.name]) acc[lookup.type.name] = [];
                    acc[lookup.type].push(lookup);
                    return acc;
                }, {}),
                lookupMaps: action.payload.reduce((acc: Record<string, string[]>, lookup: any) => {
                    if (!acc[lookup.value]) acc[lookup.value] = [];
                    acc[lookup.value].push(lookup._id);
                    return acc;
                }, {}),
                error: null
            };
        case DELETE_LOOKUP_SUCCESS:
            const deletedLookupId = action.payload;
            return {
                ...state,
                lookupsAll: state.lookupsAll.filter(lookup => lookup.id !== deletedLookupId),
                lookupsByParent: Object.fromEntries(
                    Object.entries(state.lookupsByParent).map(([key, lookups]) => [
                        key,
                        lookups.filter(lookup => lookup.id !== deletedLookupId)
                    ])
                ),
                lookupsByType: Object.fromEntries(
                    Object.entries(state.lookupsByType).map(([key, lookups]) => [
                        key,
                        lookups.filter(lookup => lookup.id !== deletedLookupId)
                    ])
                ),
                lookupMaps: Object.fromEntries(
                    Object.entries(state.lookupMaps).map(([key, ids]) => [
                        key,
                        ids.filter(id => id !== deletedLookupId)
                    ])
                ),
                error: null
            };
        case UPDATE_LOOKUP_SUCCESS:
            const updatedLookup = action.payload;
            return {
                ...state,
                lookupsAll: state.lookupsAll.map(lookup =>
                    lookup.id === updatedLookup.id ? updatedLookup : lookup
                ),
                lookupsByParent: {
                    ...state.lookupsByParent,
                    [updatedLookup.parentId]: state.lookupsByParent[updatedLookup.parentId]?.map(lookup =>
                        lookup.id === updatedLookup.id ? updatedLookup : lookup
                    ) || []
                },
                lookupsByType: {
                    ...state.lookupsByType,
                    [updatedLookup.type.name]: state.lookupsByType[updatedLookup.type.name]?.map(lookup =>
                        lookup.id === updatedLookup.id ? updatedLookup : lookup
                    ) || []
                },
                lookupMaps: {
                    ...state.lookupMaps,
                    [updatedLookup.value]: state.lookupMaps[updatedLookup.value]?.map(id =>
                        id === updatedLookup.id ? updatedLookup._id : id
                    ) || []
                },
                error: null
            };

        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, { _id: action.payload._id, name: action.payload.name }],
                error: null
            };
        case CREATE_CATEGORY_FAILURE:
        case GET_CATEGORIES_FAILURE:
        case UPDATE_CATEGORY_FAILURE:
        case DELETE_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload.map((category: any) => ({ _id: category._id, name: category.name })),
                error: null
            };
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(category =>
                    category._id === action.payload._id ? { _id: action.payload._id, name: action.payload.name } : category
                ),
                error: null
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== action.payload),
                error: null
            };
        default:
            return state;
    }
};

export default lookupData;
