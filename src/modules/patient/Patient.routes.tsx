import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import ClientProfile from './ClientProfile/ClientProfile.component';
import ClientMainLayout from './MainLayout/MainLayout.component';
import ClientHome from './Home/ClientHome.component';
import FindDoctor from './FindDoctor/FindDoctor.component';
import FindClinic from './FindClinic/FindClinic.component';
import UnProtectedRoute from '../../shared/components/UnProtectedRoute';
import ProtectedRoute from '../../shared/components/ProtectedRoute';
import { AuthRoutes } from './Auth/Auth.routes';
import ProfileComponent from '../../shared/components/Profile/Profile.component';
import DoctorClinicProfile from './DoctorClinicProfile/DoctorClinicProfile.component';
import AppointmentHistory from './AppointmentHistory/AppointmentHistory.component';

const Root: React.FC = () => {
  return <div><Outlet/></div>;
};

const clientChildren: RouteObject[] = [
  { path: 'profile', element: <ProtectedRoute component={ClientProfile} /> },
  { path: '', element: <UnProtectedRoute component={ClientHome} /> },
  { path: 'home', element: <ClientHome /> },
  { path: 'doctor', element: <FindDoctor/> },
  { path: 'doctor/clinic/:clinic_id', element: <FindDoctor/> },
  { path: 'clinic', element: <FindClinic/> },
  { path: 'auth', element: <UnProtectedRoute component={Root}/>, children: AuthRoutes },
  { path: 'profile', element: <ProtectedRoute component={ProfileComponent}/> },
  { path: 'history', element: <ProtectedRoute component={AppointmentHistory}/> },
  { path: 'info/doctor/:id', element: <DoctorClinicProfile/> },


];
export const PatientRoutes: RouteObject[] = [
  {
    path: '',
    element: <ClientMainLayout />,
    children: clientChildren
  },
];
