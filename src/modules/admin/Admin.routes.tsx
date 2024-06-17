import { RouteObject } from 'react-router-dom';
import AdminDashboardLayout from './AdminDashboardLayout/AdminDashboardLayout.component';
import BlankPageComponent from './Dashboard/Dashboard.component';
import ProfileComponent from './Profile/Profile.component';

const adminChildren: RouteObject[] = [
  { path: 'dashboard', element: <BlankPageComponent page="dashboard" /> },
  { path: 'users', element: <ProfileComponent  /> },
  { path: 'clinics', element: <BlankPageComponent page="doctors" /> },
  { path: 'settings', element: <BlankPageComponent page="settings" /> },
  { path: 'profile', element: <BlankPageComponent page="profile" /> },
  { path: '', element: <BlankPageComponent page="empty" /> }
];

export const AdminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminDashboardLayout />,
    children: adminChildren
  },
];
