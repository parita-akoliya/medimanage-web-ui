import React from 'react';
import { RouteObject } from 'react-router-dom';
import ClientDashboard from './dashboard/Dashboard.component';

export const PatientRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <ClientDashboard />,
  },
];
