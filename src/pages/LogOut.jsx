import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function LogoutPage({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/login" />;
}

export default LogoutPage;
