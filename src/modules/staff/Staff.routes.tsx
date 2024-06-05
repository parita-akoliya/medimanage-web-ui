import React from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../../shared/components/ProtectedRoute';
import StaffDashboard from './dashboard/Dashboard.component';

export const StaffRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <ProtectedRoute component={StaffDashboard} />,
  },
];
