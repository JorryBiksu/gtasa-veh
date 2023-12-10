// pages/index.js atau komponen lain yang relevan
import checkLoggedInUser from '@/components/Layout/auth/ceklogin';
import AddOrderForm from '@/module/user/order/components/addOrderForm';
import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    checkLoggedInUser();
  }, []);

  return (
    <div>
      <AddOrderForm/>
    </div>
  );
};

export default Home;
