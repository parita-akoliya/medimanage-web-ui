import React from 'react';
import { Navigate, useLocation, RoutesProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/reducers';

interface UnProtectedRouteRouteProps extends RoutesProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
  token: String | null | undefined;
  role: String | null | undefined;
}

const UnProtectedRouteComponent: React.FC<UnProtectedRouteRouteProps> = ({ component: Component, isAuthenticated, token, role, ...rest }) => {
  const location = useLocation();
  const isToken = token && token?.length > 0;
  const isRole = role && role?.length > 0;
  let link = ''
  switch (role) {
    case 'Patient':
      link = '/client/home'
      break;
    case 'Doctor':
    case 'FrontDesk':
    case 'Admin':
      link = '/admin/dashboard'
      break;
    default:
      link = '/client/home'
      break;
  }
  return (!isToken && !isRole) ? (
    <Component {...rest} location={location} />
  ) : (
    <Navigate to={link} state={{ from: location }} />
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  role: state.auth.role
});

const UnProtectedRoute = connect(mapStateToProps)(UnProtectedRouteComponent);

export default UnProtectedRoute;
