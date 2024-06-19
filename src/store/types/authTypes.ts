export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const REGISTER_PATIENT_REQUEST = 'REGISTER_PATIENT_REQUEST';
export const REGISTER_PATIENT_SUCCESS = 'REGISTER_PATIENT_SUCCESS';
export const REGISTER_PATIENT_FAILURE = 'REGISTER_PATIENT_FAILURE';

export const REGISTER_ADMIN_REQUEST = 'REGISTER_ADMIN_REQUEST';
export const REGISTER_ADMIN_SUCCESS = 'REGISTER_ADMIN_SUCCESS';
export const REGISTER_ADMIN_FAILURE = 'REGISTER_ADMIN_FAILURE';

export const REGISTER_DOCTOR_REQUEST = 'REGISTER_DOCTOR_REQUEST';
export const REGISTER_DOCTOR_SUCCESS = 'REGISTER_DOCTOR_SUCCESS';
export const REGISTER_DOCTOR_FAILURE = 'REGISTER_DOCTOR_FAILURE';


export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

interface User {
    email: string;
    password: string;
}

interface LoginUserRequestAction {
    type: typeof LOGIN_USER_REQUEST;
    payload: User;
}

interface LoginUserSuccessAction {
    type: typeof LOGIN_USER_SUCCESS;
    payload: any;
}

interface LoginUserFailureAction {
    type: typeof LOGIN_USER_FAILURE;
    error: string;
}

interface RegisterUserRequestAction {
    type: typeof REGISTER_PATIENT_REQUEST;
    payload: Object;
}

interface RegisterUserSuccessAction {
    type: typeof REGISTER_PATIENT_SUCCESS;
    payload: any;
}

interface RegisterUserFailureAction {
    type: typeof REGISTER_PATIENT_FAILURE;
    error: string;
}

interface RegisterDoctorRequestAction {
    type: typeof REGISTER_DOCTOR_REQUEST;
    payload: Object;
}

interface RegisterDoctorSuccessAction {
    type: typeof REGISTER_DOCTOR_SUCCESS;
    payload: any;
}

interface RegisterDoctorFailureAction {
    type: typeof REGISTER_DOCTOR_FAILURE;
    error: string;
}

interface RegisterAdminRequestAction {
    type: typeof REGISTER_ADMIN_REQUEST;
    payload: Object;
}

interface RegisterAdminSuccessAction {
    type: typeof REGISTER_ADMIN_SUCCESS;
    payload: any;
}

interface RegisterAdminFailureAction {
    type: typeof REGISTER_ADMIN_FAILURE;
    error: string;
}


interface VerifyOTPRequestAction {
    type: typeof VERIFY_OTP_REQUEST;
    payload: string;
}

interface VerifyOTPSuccessAction {
    type: typeof VERIFY_OTP_SUCCESS;
    payload: { token: string, role: string };
}

interface VerifyOTPFailureAction {
    type: typeof VERIFY_OTP_FAILURE;
    error: string;
}

interface ForgotPasswordRequestAction {
    type: typeof FORGOT_PASSWORD_REQUEST;
    payload: Object;
}

interface ForgotPasswordRequestSuccess {
    type: typeof FORGOT_PASSWORD_SUCCESS;
    payload: Object;
}

interface ForgotPasswordRequestFailure {
    type: typeof FORGOT_PASSWORD_FAILURE;
    error: string;
}

interface ResetPasswordRequestAction {
    type: typeof RESET_PASSWORD_REQUEST;
    payload: Object;
}

interface ResetPasswordRequestSuccess {
    type: typeof RESET_PASSWORD_SUCCESS;
    payload: Object;
}

interface ResetPasswordRequestFailure {
    type: typeof FORGOT_PASSWORD_FAILURE;
    error: string;
}

interface LogoutRequest {
    type: typeof LOGOUT_REQUEST;
}

interface LogoutSuccess {
    type: typeof LOGOUT_SUCCESS;
}

interface LogoutFailure {
    type: typeof LOGOUT_FAILURE;
    error: string;
}


export type AuthActionTypes =
    | LoginUserRequestAction
    | LoginUserSuccessAction
    | LoginUserFailureAction
    | RegisterUserRequestAction
    | RegisterUserSuccessAction
    | RegisterUserFailureAction
    | VerifyOTPRequestAction
    | VerifyOTPSuccessAction
    | VerifyOTPFailureAction
    | ForgotPasswordRequestAction
    | ForgotPasswordRequestSuccess
    | ForgotPasswordRequestFailure
    | ResetPasswordRequestAction
    | ResetPasswordRequestSuccess
    | ResetPasswordRequestFailure
    | LogoutRequest
    | LogoutFailure
    | LogoutSuccess
    | RegisterAdminRequestAction
    | RegisterAdminSuccessAction
    | RegisterAdminFailureAction
    | RegisterDoctorRequestAction
    | RegisterDoctorSuccessAction
    | RegisterDoctorFailureAction;

