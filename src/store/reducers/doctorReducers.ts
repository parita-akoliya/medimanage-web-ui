import {
    GET_ALL_DOCTORS_REQUEST,
    GET_ALL_DOCTORS_SUCCESS,
    GET_ALL_DOCTORS_FAILURE,
    GET_DOCTOR_REQUEST,
    GET_DOCTOR_SUCCESS,
    GET_DOCTOR_FAILURE,
    DELETE_DOCTOR_REQUEST,
    DELETE_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAILURE,
    UPDATE_DOCTOR_REQUEST,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAILURE,
} from '../types/doctorTypes';
import { SEARCH_DOCTORS_FAILURE, SEARCH_DOCTORS_REQUEST, SEARCH_DOCTORS_SUCCESS } from '../types/searchTypes';
import { AVAILABLE_SLOTS_SUCCESS, FILTER_SLOTS_REQUEST } from '../types/slotTypes';

interface Slots {
    dateSelected?: Date | String | undefined| null;
    slots: any[];
    filtered?: any[];
}

interface DoctorState {
    doctors: any[];
    doctor: any | null;
    slots: Slots;
    loading: boolean;
    error: string | null;
}

const initialState: DoctorState = {
    doctors: [],
    slots: {
        dateSelected: null,
        filtered:[],
        slots:[]
    },
    doctor: null,
    loading: false,
    error: null,
};

const doctors = (state = initialState, action: any): DoctorState => {
    switch (action.type) {
        case AVAILABLE_SLOTS_SUCCESS:
            return {
                ...state,
                loading: false,
                slots: {
                    slots:action.payload,
                    filtered:state.slots.filtered,
                    dateSelected:state.slots.dateSelected
                },
            };
        case FILTER_SLOTS_REQUEST:
            let finalSlots:any[]= []
            state.slots.slots.forEach(slot => {
                const slotDate = new Date(slot.start_time).toDateString();
                const filterDate = new Date(action.payload).toDateString();
                
                if(slotDate === filterDate){
                    console.log("tefjbdfjb");
                    
                    finalSlots.push(slot)
                }
            });

            return {
                ...state,
                loading: false,
                slots: {
                    slots: state.slots.slots,
                    filtered:finalSlots,
                    dateSelected:state.slots.dateSelected
                },
            };
        case GET_ALL_DOCTORS_REQUEST:
        case GET_DOCTOR_REQUEST:
        case DELETE_DOCTOR_REQUEST:
        case UPDATE_DOCTOR_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ALL_DOCTORS_SUCCESS:
            return {
                ...state,
                loading: false,
                doctors: action.payload,
            };
        case GET_DOCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                doctor: action.payload,
            };
        case DELETE_DOCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                doctors: state.doctors.filter(doctor => doctor.id !== action.payload),
            };
        case UPDATE_DOCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                doctor: action.payload,
            };
        case GET_ALL_DOCTORS_FAILURE:
        case GET_DOCTOR_FAILURE:
        case DELETE_DOCTOR_FAILURE:
        case UPDATE_DOCTOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SEARCH_DOCTORS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SEARCH_DOCTORS_SUCCESS:
            return {
                ...state,
                loading: false,
                doctors: action.payload,
            };
        case SEARCH_DOCTORS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default doctors;
