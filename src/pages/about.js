// pages/index.js
import Layout from '@/components/Layout/Layout';
import { AboutPage } from '@/module/user/dashboard/about';
const Home = () => (
  <Layout>
    <AboutPage />
  </Layout>
);

export default Home;
