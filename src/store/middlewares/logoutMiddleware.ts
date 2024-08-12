import { Middleware } from 'redux';
import { LOGOUT_REQUEST } from '../types/authTypes';
import { NavigateFunction } from 'react-router-dom';

export const createLogoutMiddleware = (navigate: NavigateFunction): Middleware => {
  return store => next => action => {
    if (action.type === LOGOUT_REQUEST) {
      const role = localStorage.getItem('role');
      if (role) {
        localStorage.setItem('prevRole', role);
      }
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
    return next(action);
  };
};
