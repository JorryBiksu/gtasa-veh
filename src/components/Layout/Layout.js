// components/Layout/Layout.js
import { FooterSimple } from './footer';
import { HeaderMenu } from './header';

const Layout = ({ children }) => (
  <>
    <HeaderMenu />
    {children}
    <FooterSimple/>
  </>
);

export default Layout;
