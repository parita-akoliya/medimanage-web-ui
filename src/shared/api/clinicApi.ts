import api, { CustomAxiosRequestConfig } from './api'; // Import your Axios instance and any custom Axios configurations
import { AxiosResponse } from 'axios';

export const registerClinic = async (any: any): Promise<AxiosResponse<any>> => {
    const response = await api.put('/clinic', any, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

export const deleteClinic = async (clinicId: string): Promise<AxiosResponse<any>> => {
    const response = await api.delete(`/clinic/${clinicId}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

export const updateClinic = async (any: any): Promise<AxiosResponse<any>> => {
    const response = await api.post('/clinic', any, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

export const getClinicDetailsWithDoctors = async (clinicId: string): Promise<AxiosResponse<any>> => {
    const response = await api.get(`/clinic/${clinicId}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

export const getAllClinics = async (): Promise<AxiosResponse<any>> => {
    const response = await api.get(`/clinics`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const clinicApi = {
    registerClinic,
    deleteClinic,
    updateClinic,
    getClinicDetailsWithDoctors,
    getAllClinics
}

export default clinicApi;
