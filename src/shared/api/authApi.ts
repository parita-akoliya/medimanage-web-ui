import api from "./api";

const login = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response?.data;    
};

const registerPatient = async (userData: any) => {
  const response = await api.post('/auth/register/patient', userData);
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

const resetPassword = async (resetToken: string, newPassword: string) => {
  const response = await api.post('/auth/reset-password', {token: resetToken, newPassword})
  return response.data;
}

const authApi = {login, registerPatient, forgotPassword, verifyOtp, resetPassword } 

export default authApi