import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import DashBoard from './DashBoard';
import LoginPage from './LoginPage';
import Customer from './Customer'
import AuthenticationLayout from '../Layouts/AuthenticationLayout';
import { NotFound } from './NotFound';
import DashboarLayout from '../Layouts/DashboardLayout';
import ForgotPassword from './ForgotPassword';
import SupportTickets from './SupportTickets';
import Transactions from './Transactions';

const AppRoutes = () => {
  return (
    <div>
        {/* <Route element={<DashboarLayout />}>
          <Route path="/" element={<AuthenticationLayout />} />
          <Route
            path="/dashboard"
            element={<DashBoard/>}
          />
        </Route> */}
        {/* <Route element={<LoginPage />}> */}


      <Routes>
        <Route element={<DashboarLayout />}>
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/supportTickets" element={<SupportTickets/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="*" element={<NotFound />}/>
        </Route>
        <Route path="/" element={<AuthenticationLayout/>}>
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path='forgetpassword' element={<ForgotPassword/>} />
          <Route path="404" element={<NotFound />}/>
        </Route>
      </Routes>

      
    </div >
  );
};

export default AppRoutes;
