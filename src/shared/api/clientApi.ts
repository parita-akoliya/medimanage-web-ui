import api, { CustomAxiosRequestConfig } from "./api";

const searchClinics = async (query: any) => {
    const response = await api.get('/search/clinics', { params: query });
    return response.data;
};

const searchDoctors = async (query?: any) => {
    let paramsObj = {}
    if (query) {
        paramsObj = { params: query }
    }
    const response = await api.get('/search/doctors', paramsObj)
    return response.data;
}

const addSlots = async (reqBody: any) => {
    const response = await api.post('/slot', reqBody, { useToken: true } as CustomAxiosRequestConfig)
    return response.data;
}

const availableSlots = async (doctorId: string) => {
    const response = await api.get(`/slot/available/${doctorId}`, { useToken: true } as CustomAxiosRequestConfig)
    return response.data;
}

const scheduleAppointment = async (data: string) => {
    const response = await api.post(`/appointment`, data, { useToken: true } as CustomAxiosRequestConfig)
    return response.data;
}

const getAppointments = async (data: string) => {
    const response = await api.get(`/appointment`, { useToken: true } as CustomAxiosRequestConfig)
    return response.data;
}

const cancelAppointments = async (data: string) => {
    const response = await api.delete(`/appointment`, { useToken: true } as CustomAxiosRequestConfig)
    return response.data;
}


const clientApi = { searchClinics, searchDoctors, addSlots, availableSlots, scheduleAppointment, getAppointments, cancelAppointments }

export default clientApi