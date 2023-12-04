// components/Layout/Layout.js
import { HeaderMenu } from './header';

const Layout = ({ children }) => (
  <>
    <HeaderMenu />
    {children}
  </>
);

export default Layout;
