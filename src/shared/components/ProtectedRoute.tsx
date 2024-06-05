import React from 'react';
import { Navigate, useLocation, RoutesProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/reducers';
import { AuthRoleMappings, PathToRoleMappings } from '../../store/types/RoleTypes';

interface ProtectedRouteProps extends RoutesProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
  token: String | null | undefined;
  role: String | null | undefined;
}

const ProtectedRouteComponent: React.FC<ProtectedRouteProps> = ({ component: Component, isAuthenticated, token, role, ...rest }) => {
  const location = useLocation();
  const isToken = token && token?.length > 0;
  const isRole = role && role?.length > 0;
  const path = location.pathname;
  const basePath: string = path.split('/')[1]
  const roleMapped = PathToRoleMappings[basePath]
  const isValidPath = roleMapped === role
  let prevRole = undefined;
  let link = undefined;

  if (localStorage.getItem('prevRole') != undefined && localStorage.getItem('prevRole') != '') {
    prevRole = localStorage.getItem('prevRole')!
    link = AuthRoleMappings[prevRole]
  }
  return (isAuthenticated && isToken && isRole && isValidPath) ? (
    <Component {...rest} location={location} />
  ) : (
    <Navigate to={link ? link : "/auth"} state={{ from: location }} />
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  role: state.auth.role
});

const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteComponent);

export default ProtectedRoute;
