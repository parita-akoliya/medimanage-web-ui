interface RoleConstants {
    [key: string]: string;
  }

export const RoleTypes: RoleConstants = {
    PATIENT: 'Patient',
    ADMIN: 'Admin',
    FRONTDESK: 'FrontDesk',
    DOCTOR: 'Doctor'
}

export const PathToRoleMappings: RoleConstants = {
    'client': 'Patient',
    'staff': 'FrontDesk',
    'doctor': 'Doctor',
    'admin': 'Admin'    
}

export const AuthRoleMappings: RoleConstants = {
    'Patient': '/auth',
    'FrontDesk': '/admin-auth',
    'Doctor': '/admin-auth',
    'Admin': '/admin-auth'    
}