import api from "./api";

const login = async (credentials: any) => {
  const formData = new FormData();
  formData.append('data', credentials)
  const response = await api.post('/auth/login', formData);
  return response?.data;    
};

const registerPatient = async (userData: any) => {
  const formData = new FormData();
  formData.append('data', userData)
  const response = await api.post('/auth/register/patient', formData);
  return response.data;
};

const forgotPassword = async (email: any) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

const verifyOtp = async (otp: string, email: string) => {
  const response = await api.post('/auth/verify-otp', { otp, email });
  return response.data;
};

const resetPassword = async (credentials: any) => {
  const formData = new FormData();
  formData.append('data', credentials)
  const response = await api.post('/auth/reset-password', formData)
  return response.data;
}

const authApi = {login, registerPatient, forgotPassword, verifyOtp, resetPassword } 

export default authApi