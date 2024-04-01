import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { isGivePermission } from './GivePermission';

const AppRoutes = () => {


  const Authentication = ({ path }) => {
    const auth = isGivePermission()
    console.log(auth, "test123")
    if (auth) {
      return <DashBoard />;
    } else {
      if (path !== '/login') {

        return <Navigate to="/login" />;
      } else {
        return null;
      }
    }
  };

  return (
    <div>




      <Routes>
        <Route element={<DashboarLayout />}>
          <Route path="/" element={<Authentication />} />
          <Route path="/dashboard" element={<Authentication />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/supportTickets" element={<SupportTickets />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path='/addcustomer' element={<AddCustomer />} />
          <Route path="/edit-customer/:customer:Id" element={<EditCustomer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AuthenticationLayout />}>
          <Route path="/" element={<Authentication />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path='forgetpassword' element={<ForgotPassword />} />
          <Route path="404" element={<NotFound />} />
        </Route>
      </Routes>


    </div>
  );
};

export default AppRoutes;