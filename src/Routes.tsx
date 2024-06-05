import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AuthRoutes } from './modules/auth/Auth.routes';
import { PatientRoutes } from './modules/patient/Patient.routes';
import { StaffRoutes } from './modules/staff/Staff.routes';
import { DoctorRoutes } from './modules/doctor/Doctor.routes';
import { AdminRoutes } from './modules/admin/Admin.routes';
import UnProtectedRoute from './shared/components/UnProtectedRoute';
import ProtectedRoute from './shared/components/ProtectedRoute';
import { AdminAuthRoutes } from './modules/admin-auth/AdminAuth.routes';

const Root: React.FC = () => {
  return <div><Outlet/></div>;
};

export const routes: RouteObject[] = [
  {
    path: '/auth/',
    element: <UnProtectedRoute component={Root} />,  
    children: AuthRoutes,
  },
  {
    path: '/admin-auth/',
    element: <UnProtectedRoute component={Root} />,  
    children: AdminAuthRoutes,
  },

  {
    path: '/client/',
    element: <ProtectedRoute component={Root} />,
    children: PatientRoutes,
  },
  {
    path: '/staff/',
    element: <ProtectedRoute component={Root} />,
    children: StaffRoutes,
  },
  {
    path: '/doctor/',
    element: <ProtectedRoute component={Root} />,
    children: DoctorRoutes,
  },
  {
    path: '/admin/',
    element: <ProtectedRoute component={Root} />,
    children: AdminRoutes,
  }
];
