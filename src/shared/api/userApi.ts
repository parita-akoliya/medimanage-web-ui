import api, { CustomAxiosRequestConfig } from './api';

const changeUserRole = async (userData: any) => {
    const response = await api.post('/admin/change-role', userData, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const updateEmail = async (userData: any) => {
    const response = await api.post('/admin/update-email', userData, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const resetPassword = async (userData: any) => {
    const response = await api.post('/admin/reset-password', userData, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const getUser = async (userId: string) => {
    const response = await api.get(`/users/${userId}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const deleteUser = async (userId: string) => {
    const response = await api.delete(`/auth/users/${userId}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const getAllUsers = async () => {
    const response = await api.get('/users', { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const updateUser = async (userId: string, userData: any) => {
    const response = await api.put(`/user/${userId}`, userData, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};


const userApi = { changeUserRole, getAllUsers, deleteUser, getUser, resetPassword, updateEmail, updateUser }


export default userApi