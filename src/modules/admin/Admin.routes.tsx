import { RouteObject } from 'react-router-dom';
import AdminDashboardLayout from './AdminDashboardLayout/AdminDashboardLayout.component';
import ProfileComponent from '../../shared/components/Profile/Profile.component';
import DashboardComponent from './Dashboard/Dashboard.component';
import UserManagementComponent from './UserManagement/UserManagement.component';
import ClinicManagementComponent from './ClinicManagement/ClinicManagement.component';
import AppointmentList from './AppointmentList/AppointmentList.component';

const adminChildren: RouteObject[] = [
  { path: 'dashboard', element: <DashboardComponent page="dashboard" /> },
  { path: 'users', element: <UserManagementComponent  /> },
  { path: 'clinic', element: <ClinicManagementComponent /> },
  { path: 'settings', element: <DashboardComponent page="settings" /> },
  { path: 'profile', element: <ProfileComponent /> },
  { path: 'appointment', element: <AppointmentList /> },
  { path: '', element: <DashboardComponent page="empty" /> }
];

export const AdminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminDashboardLayout />,
    children: adminChildren
  },
];
