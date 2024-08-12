import api, { CustomAxiosRequestConfig } from './api';


const createLookup = async (data: any) => {
    const response = await api.post('/lookup', data, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const createLookupInCategory = async (category: string, data: any) => {
    const response = await api.post(`/lookup/category/${category}`, data, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const getLookups = async () => {
    const response = await api.get('/lookup', { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const getLookupsByCategory = async (category: string) => {
    const response = await api.get(`/lookup/category/${category}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const getLookupsByParent = async (parentId: string) => {
    const response = await api.get(`/lookup/parent/${parentId}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const deleteLookup = async (id: string) => {
    const response = await api.delete(`/lookup/${id}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const updateLookup = async (id: string, data: any) => {
    const response = await api.put(`/lookup/${id}`, data, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};


const createLookupCategory = async (data: any) => {
    const response = await api.post('/lookup/category', data, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const getAllCategories = async () => {
    const response = await api.get('/lookup/categories', { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const updateLookupCategory = async (id: string, data: any) => {
    const response = await api.put(`/lookup/category/${id}`, data, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const deleteLookupCategory = async (id: string) => {
    const response = await api.delete(`/lookup/category/${id}`, { useToken: true } as CustomAxiosRequestConfig);
    return response.data;
};

const lookupApi = {
    createLookup,
    createLookupInCategory,
    getLookups,
    getLookupsByCategory,
    getLookupsByParent,
    deleteLookup,
    updateLookup,
    createLookupCategory,
    getAllCategories,
    updateLookupCategory,
    deleteLookupCategory
};

export default lookupApi;
