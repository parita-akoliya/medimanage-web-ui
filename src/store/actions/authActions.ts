import {
    LOGIN_USER_REQUEST,
    VERIFY_OTP_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    REGISTER_PATIENT_REQUEST,
    REGISTER_PATIENT_SUCCESS,
    REGISTER_PATIENT_FAILURE,
    RESET_PASSWORD_REQUEST,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAILURE,
    REGISTER_ADMIN_REQUEST,
    REGISTER_DOCTOR_SUCCESS,
    REGISTER_DOCTOR_FAILURE,
    REGISTER_DOCTOR_REQUEST,
} from '../types/authTypes';

export const loginUser = (email: string, password: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({
    type: LOGIN_USER_REQUEST, payload: { email, password }, callbacks: { onCallSuccess, onCallFail }
});

export const registerPatient = (userData: Object, onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: REGISTER_PATIENT_REQUEST, payload: userData, callbacks: { onCallSuccess, onCallFail } }
);

export const verifyOTP = (email: string, otp: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: VERIFY_OTP_REQUEST, payload: { email, otp }, callbacks: { onCallSuccess, onCallFail } });

export const loginSuccess = (verified: boolean, email: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => {
    return { type: LOGIN_USER_SUCCESS, payload: { verified, email }, callbacks: { onCallSuccess, onCallFail } };
}

export const loginFailure = (error: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: LOGIN_USER_FAILURE, error, callbacks: { onCallSuccess, onCallFail } });

export const registerSuccess = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: REGISTER_PATIENT_SUCCESS, payload: {}, callbacks: { onCallSuccess, onCallFail } });

export const registerFailure = (error: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: REGISTER_PATIENT_FAILURE, error, callbacks: { onCallSuccess, onCallFail } });

export const verifyOtpSuccess = (token: string, role: string, name:string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: VERIFY_OTP_SUCCESS, payload: { token, role, name }, callbacks: { onCallSuccess, onCallFail } });

export const verifyOtpFailure = (error: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: VERIFY_OTP_FAILURE, error, callbacks: { onCallSuccess, onCallFail } });

export const forgotPasswordRequest = (email: string, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: FORGOT_PASSWORD_REQUEST, payload: { email }, callbacks: { onCallSuccess, onCallFail } });

export const forgotPasswordSuccess = (success: boolean) => ({ type: FORGOT_PASSWORD_SUCCESS, payload: { success } });

export const forgotPasswordFailure = (error: any) => ({ type: FORGOT_PASSWORD_FAILURE, error });

export const resetPasswordRequest = (token: String, newPassword: String, onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: RESET_PASSWORD_REQUEST, payload: { token, newPassword }, callbacks: { onCallSuccess, onCallFail } }
);

export const resetPasswordSuccess = (success: boolean, onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: RESET_PASSWORD_SUCCESS, payload: { success }, callbacks: { onCallSuccess, onCallFail } }
);

export const resetPasswordFailure = (error: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: RESET_PASSWORD_FAILURE, error: error, callbacks: { onCallSuccess, onCallFail } }
);

export const logoutRequest = (onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: LOGOUT_REQUEST, payload: { }, callbacks: { onCallSuccess, onCallFail } }
);

export const logoutSuccess = (onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: LOGOUT_SUCCESS, payload: {}, callbacks: { onCallSuccess, onCallFail } }
);

export const logoutFailure = (error: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: LOGOUT_FAILURE, error: error, callbacks: { onCallSuccess, onCallFail } }
);

export const registerAdminSuccess = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: REGISTER_ADMIN_SUCCESS, payload: {}, callbacks: { onCallSuccess, onCallFail } });

export const registerAdminFailure = (error: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: REGISTER_ADMIN_FAILURE, error, callbacks: { onCallSuccess, onCallFail } });

export const registerAdmin = (userData: Object, onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: REGISTER_ADMIN_REQUEST, payload: userData, callbacks: { onCallSuccess, onCallFail } }
);

export const registerDoctorSuccess = (onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: REGISTER_DOCTOR_SUCCESS, payload: {}, callbacks: { onCallSuccess, onCallFail } });

export const registerDoctorFailure = (error: any, onCallSuccess?: Function | void, onCallFail?: Function | void) => ({ type: REGISTER_DOCTOR_FAILURE, error, callbacks: { onCallSuccess, onCallFail } });

export const registerDoctor = (userData: Object, onCallSuccess?: Function | void, onCallFail?: Function | void) => (
    { type: REGISTER_DOCTOR_REQUEST, payload: userData, callbacks: { onCallSuccess, onCallFail } }
);
