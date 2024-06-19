import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { PatientRoutes } from './modules/patient/Patient.routes';
import { AdminRoutes } from './modules/admin/Admin.routes';
import UnProtectedRoute from './shared/components/UnProtectedRoute';
import ProtectedRoute from './shared/components/ProtectedRoute';
import { AdminAuthRoutes } from './modules/admin/Auth/AdminAuth.routes';

const Root: React.FC = () => {
  return <div><Outlet/></div>;
};

export const routes: RouteObject[] = [
  {
    path: '/admin-auth/',
    element: <UnProtectedRoute component={Root} />,  
    children: AdminAuthRoutes,
  },
  {
    path: '/client',
    element: <Root />,
    children: PatientRoutes,
  },
  {
    path: '/admin',
    element: <ProtectedRoute component={Root} />,
    children: AdminRoutes,
  }
];
