import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
} from '../types/profileTypes';

export interface ProfileState {
    profileData?: any;
    error: string | null;
}

const initialState: ProfileState = {
    profileData: undefined,
    error: null,
};

const profile = (state = initialState, action: any): ProfileState => {
    switch (action.type) {
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profileData: action.payload,
                error: null,
            };
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                profileData: undefined,
                error: action.error,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default profile;
