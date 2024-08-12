import { RouteObject } from 'react-router-dom';
import AdminDashboardLayout from './AdminDashboardLayout/AdminDashboardLayout.component';
import ProfileComponent from '../../shared/components/Profile/Profile.component';
import DashboardComponent from './Dashboard/Dashboard.component';
import UserManagementComponent from './UserManagement/UserManagement.component';
import ClinicManagementComponent from './ClinicManagement/ClinicManagement.component';
import AppointmentList from './AppointmentList/AppointmentList.component';
import PatientAttendComponent from './PatientAttend/PatientAttend.component';
import DataManagementComponent from './DataManagement/DataManagement.component';

const adminChildren: RouteObject[] = [
  { path: 'dashboard', element: <DashboardComponent page="dashboard" /> },
  { path: 'users', element: <UserManagementComponent /> },
  { path: 'clinic', element: <ClinicManagementComponent /> },
  { path: 'doctors', element: <ClinicManagementComponent /> },
  { path: 'settings', element: <DashboardComponent page="settings" /> },
  { path: 'profile', element: <ProfileComponent /> },
  { path: 'appointment', element: <AppointmentList /> },
  { path: 'lookup', element: <DataManagementComponent /> },
  { path: 'patient-attend/:id', element: <PatientAttendComponent /> },
  { path: '', element: <DashboardComponent page="empty" /> }
];

export const AdminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminDashboardLayout />,
    children: adminChildren
  },
];
