import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet/>:<Navigate to={'/login'}/>;
};


export default ProtectedRoute;
