export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

interface GetProfileRequest {
    type: typeof GET_PROFILE_REQUEST;
}

interface GetProfileSuccess {
    type: typeof GET_PROFILE_SUCCESS;
    payload: any;
}

interface GetProfileFailure {
    type: typeof GET_PROFILE_FAILURE;
    error: string;
}

interface UpdateProfileRequest {
    type: typeof UPDATE_PROFILE_REQUEST;
}

interface UpdateProfileSuccess {
    type: typeof UPDATE_PROFILE_SUCCESS;
    payload: any;
}

interface UpdateProfileFailure {
    type: typeof UPDATE_PROFILE_FAILURE;
    error: string;
}


export type ProfileActionTypes =
    | GetProfileRequest
    | GetProfileSuccess
    | GetProfileFailure
    | UpdateProfileRequest
    | UpdateProfileSuccess
    | UpdateProfileFailure;
