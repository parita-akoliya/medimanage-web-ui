import {
    REGISTER_CLINIC_SUCCESS,
    REGISTER_CLINIC_FAILURE,
    DELETE_CLINIC_SUCCESS,
    DELETE_CLINIC_FAILURE,
    UPDATE_CLINIC_SUCCESS,
    UPDATE_CLINIC_FAILURE,
    GET_CLINIC_DETAILS_SUCCESS,
    GET_CLINIC_DETAILS_FAILURE,
} from '../types/clinicTypes';

export interface ClinicState {
    clinics?: any;
    error: string | null;
}

const initialState: ClinicState = {
    clinics: undefined,
    error: null,
};

const clinic = (state = initialState, action: any): ClinicState => {
    switch (action.type) {
        case REGISTER_CLINIC_SUCCESS:
        case UPDATE_CLINIC_SUCCESS:
            state.clinics.forEach((clinic: any) => {
                if(clinic._id === action.payload._id) {
                    clinic = action.payload
                }
            })
            return {
                ...state,
                clinics: state.clinics,
                error: null,
            };
        case DELETE_CLINIC_SUCCESS:
            return {
                ...state,
                clinics: undefined, // Assuming deletion removes data from state
                error: null,
            };
        case GET_CLINIC_DETAILS_SUCCESS:
            console.log("clinic:",action);
            
            return {
                ...state,
                clinics: action.payload,
                error: null,
            };
        case REGISTER_CLINIC_FAILURE:
        case DELETE_CLINIC_FAILURE:
        case UPDATE_CLINIC_FAILURE:
        case GET_CLINIC_DETAILS_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default clinic;
