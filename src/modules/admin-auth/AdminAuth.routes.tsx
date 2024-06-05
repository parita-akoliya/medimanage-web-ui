
import React from 'react';
import AdminAuthScreen from './AdminAuthScreen.component';
import { RouteObject } from 'react-router-dom';
import ResetPasswordComponent from './reset-password/ResetPassword.component';
export const AdminAuthRoutes: RouteObject[] = [
  {
    path: '',
    element: <AdminAuthScreen />,
  },
  {
    path:'reset-password/:id',
    element: <ResetPasswordComponent />
  }
];
