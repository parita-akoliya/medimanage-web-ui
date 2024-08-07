import { GET_APPOINTMENT_SUCCESS, GET_APPOINTMENT_FAILURE, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILURE } from '../types/slotTypes';

export interface AppointmentState {
    appointments?: any[] | null;
    error: string | null;
}


const initialState: AppointmentState = {
    appointments: [],
    error: null,
};

const appointments = (state = initialState, action: any): AppointmentState => {
    switch (action.type) {
        case GET_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointments: action.payload,
            };
        case GET_APPOINTMENT_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case UPDATE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointments: state.appointments,
            };
        case UPDATE_APPOINTMENT_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default appointments;
