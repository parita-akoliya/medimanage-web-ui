import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 50000,
});

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  useToken?: boolean;
}

api.interceptors.request.use(
  (config: CustomAxiosRequestConfig | any) => {
    if (!config.useToken) {
      return config;
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const role = localStorage.getItem("role")!
      localStorage.setItem("prevRole", role)
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
    return Promise.reject(error);
  }
);

export default api;
