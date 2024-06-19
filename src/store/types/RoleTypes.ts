interface RoleConstants {
    [key: string]: string;
}
interface RoleConstantsMap {
    [key: string]: String[];
}


export const RoleTypes: RoleConstants = {
    PATIENT: 'Patient',
    ADMIN: 'Admin',
    FRONTDESK: 'FrontDesk',
    DOCTOR: 'Doctor'
}

export const PathToRoleMappings: RoleConstantsMap = {
    'client': ['Patient'],
    'admin': ['Admin', 'Doctor', 'FrontDesk']
}

export const AuthRoleMappings: RoleConstants = {
    'Patient': '/client/auth',
    'FrontDesk': '/admin-auth',
    'Doctor': '/admin-auth',
    'Admin': '/admin-auth'
}