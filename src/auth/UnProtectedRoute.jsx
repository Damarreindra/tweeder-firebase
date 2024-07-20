import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UnProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to={'/home'}/>:<Outlet/>;
};


export default UnProtectedRoute;
