// pages/index.js atau komponen lain yang relevan
import checkLoggedInUser from '@/components/Layout/auth/ceklogin';
import Layout from '@/components/Layout/Layout';
import { AdminDashboard } from '@/module/admin/dashboard';
import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    checkLoggedInUser();
  }, []);

  return (
    <div>
    <Layout>
      <AdminDashboard/>
    </Layout>
    </div>
  );
};

export default Home;
