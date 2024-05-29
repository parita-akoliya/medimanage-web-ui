import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from './login/Login.component';
import Register from './register/Register.component';

export const AuthRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
];
