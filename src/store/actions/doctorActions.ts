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

export const getAllDoctorsRequest = (onCallSuccess?: Function, onCallFail?: Function) => ({
  type: GET_ALL_DOCTORS_REQUEST,
  onCallSuccess,
  onCallFail,
});

export const getAllDoctorsSuccess = (doctors: any, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: GET_ALL_DOCTORS_SUCCESS,
  payload: doctors,
  onCallSuccess,
  onCallFail,
});

export const getAllDoctorsFailure = (error: any, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: GET_ALL_DOCTORS_FAILURE,
  payload: error,
  onCallSuccess,
  onCallFail,
});

export const getDoctorRequest = (doctorId: string, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: GET_DOCTOR_REQUEST,
  payload: doctorId,
  onCallSuccess,
  onCallFail,
});

export const getDoctorSuccess = (doctor: any, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: GET_DOCTOR_SUCCESS,
  payload: doctor,
  onCallSuccess,
  onCallFail,
});

export const getDoctorFailure = (error: any, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: GET_DOCTOR_FAILURE,
  payload: error,
  onCallSuccess,
  onCallFail,
});

export const deleteDoctorRequest = (doctorId: string, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: DELETE_DOCTOR_REQUEST,
  payload: doctorId,
  onCallSuccess,
  onCallFail,
});

export const deleteDoctorSuccess = (doctorId: string, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: DELETE_DOCTOR_SUCCESS,
  payload: doctorId,
  onCallSuccess,
  onCallFail,
});

export const deleteDoctorFailure = (error: any, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: DELETE_DOCTOR_FAILURE,
  payload: error,
  onCallSuccess,
  onCallFail,
});

export const updateDoctorRequest = (doctor: any, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: UPDATE_DOCTOR_REQUEST,
  payload: doctor,
  onCallSuccess,
  onCallFail,
});

export const updateDoctorSuccess = (doctor: any, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: UPDATE_DOCTOR_SUCCESS,
  payload: doctor,
  onCallSuccess,
  onCallFail,
});

export const updateDoctorFailure = (error: any, onCallSuccess?: Function, onCallFail?: Function) => ({
  type: UPDATE_DOCTOR_FAILURE,
  payload: error,
  onCallSuccess,
  onCallFail,
});
