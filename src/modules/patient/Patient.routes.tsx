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

const Root: React.FC = () => {
  return <div><Outlet/></div>;
};

const clientChildren: RouteObject[] = [
  { path: 'profile', element: <ProtectedRoute component={ClientProfile} /> },
  { path: '', element: <UnProtectedRoute component={ClientHome} /> },
  { path: 'home', element: <ClientHome /> },
  { path: 'find-doctor', element: <FindDoctor/> },
  { path: 'find-doctor/clinic/:clinic_id', element: <FindDoctor/> },
  { path: 'find-clinic', element: <FindClinic/> },
  { path: 'auth', element: <UnProtectedRoute component={Root}/>, children: AuthRoutes },
  { path: 'profile', element: <UnProtectedRoute component={ProfileComponent}/> },
  { path: 'doctor-clinic-info/:id', element: <DoctorClinicProfile/> },


];
export const PatientRoutes: RouteObject[] = [
  {
    path: '/client',
    element: <ClientMainLayout />,
    children: clientChildren
  },
];
