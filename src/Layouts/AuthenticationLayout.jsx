import React from 'react';
import { Outlet } from 'react-router-dom';

// const AuthenticationLayout = () => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     return <Navigate to="/dashboard" />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default AuthenticationLayout;

const AuthenticationLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthenticationLayout