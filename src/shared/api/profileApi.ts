import api, { CustomAxiosRequestConfig } from "./api";

const getProfile = async () => {
    const response = await api.get('/profile', { useToken: true } as CustomAxiosRequestConfig) ;
    return response?.data;
};

const updateProfile = async (userData: any) => {
    const response = await api.put('/profile', userData, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const profileApi = { getProfile, updateProfile }

export default profileApi