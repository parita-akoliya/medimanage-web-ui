import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminDashboard from './dashboard/Dashboard.component';

export const AdminRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <AdminDashboard />,
  },
];
