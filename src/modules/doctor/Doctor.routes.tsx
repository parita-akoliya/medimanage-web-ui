import React from 'react';
import { RouteObject } from 'react-router-dom';
import DoctorDashboard from './dashboard/Dashboard.component';

export const DoctorRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <DoctorDashboard />,
  },
];
