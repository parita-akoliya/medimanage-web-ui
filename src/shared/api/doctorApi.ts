import api, { CustomAxiosRequestConfig } from "./api";

const getDoctor = async (doctorId: any) => {
  const response = await api.get(`/doctor/${doctorId}`, { useToken: true } as CustomAxiosRequestConfig);
  return response.data;
};

const getDoctorByClinicId = async (clinicId: any) => {
  const response = await api.get(`/doctors/clinic/${clinicId}`);
  return response.data;
};


const updateDoctor = async (doctorData: any) => {
    const response = await api.post(`/doctors`, doctorData, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
  };
  

const getAllDoctors = async () => {
    const response = await api.get(`/doctors`);
    return response.data;
};

const deleteDoctor = async (doctorId: any) => {
    const response = await api.delete(`/doctors/${doctorId}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
  };
  
  
const doctorApi = {getAllDoctors, getDoctor, deleteDoctor, updateDoctor, getDoctorByClinicId } 

export default doctorApi