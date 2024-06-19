
import React from 'react';
import AuthScreen from './AuthScreen.component';
import { RouteObject } from 'react-router-dom';
import ResetPasswordComponent from './reset-password/ResetPassword.component';
export const AuthRoutes: RouteObject[] = [
  {
    path: '',
    element: <AuthScreen />,
  },
  {
    path:'reset-password/:id',
    element: <ResetPasswordComponent />
  }
];
