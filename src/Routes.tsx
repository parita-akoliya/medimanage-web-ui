import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AuthRoutes } from './modules/auth/Auth.routes';

const Root: React.FC = () => {
  return <div><Outlet/></div>;
};

export const routes: RouteObject[] = [
  {
    path: '/auth/',
    element: <Root />,  
    children: AuthRoutes,
  }
];
