//header.js
import { useEffect, useState } from 'react';
import { Menu, Group, Center, Button, MantineProvider, Text, Avatar } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { Logo } from './_logo';
import classes from '../../styles/HeaderMenu.module.css';
import Link from 'next/link';
import checkLoggedInUser from './auth/ceklogin';
import { useRouter } from 'next/router';

const links = [
  { link: '/dashboard', label: 'Dashboard' },
  { link: '/order', label: 'Shop Now', },
  { link: '/pricing', label: 'About' },
  {
    link: '#2',
    label: 'Panel',
    links: [
      { link: '/admin/product-page', label: 'Product' },
      { link: '/admin/user-panel', label: 'User' },
      { link: '/order-page', label: 'Order' },
    ],
  },
];

export function HeaderMenu() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const user = checkLoggedInUser();
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
    }
  }, []);

  const handleLogin = () => {
    const user = checkLoggedInUser();
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
    }
  };
 
  const filteredLinks = links.map(linkItem => {
    if (linkItem.links) {
      linkItem.links = linkItem.links.filter(sublink => {
      // Update the link for admin role
        if (userInfo?.role === 'admin' && sublink.link === '/dashboard') {
          sublink.link = '/admin/dashboard';
        }
        return userInfo?.role === 'admin' || sublink.link !== '/admin/dashboard';
      });
  
      return {
        ...linkItem,
        links: linkItem.links.length > 0 ? linkItem.links : null,
      };
    }
  
    // Update the link for admin role
    if (userInfo?.role === 'admin' && linkItem.link === '/dashboard') {
      linkItem.link = '/admin/dashboard';
    }
  
    return userInfo?.role === 'admin' || linkItem.link !== '/admin/dashboard' ? linkItem : null;
  }).filter(Boolean);

  const items = filteredLinks.map(link => {
    const menuItems = link.links?.map(item => (
      <Menu.Item key={item.link}>
        <Link href={item.link} style={{textDecoration: 'none'}} passHref>
          <span className={classes.menuItem}>
            {item.label}
          </span>
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }}>
          <Menu.Target>
            <Link href={link.link} style={{textDecoration: 'none'}} passHref>
              <span className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>
                    {link.label}
                  </span>
                  <IconChevronDown size="0.9rem" stroke={1.5} />
                </Center>
              </span>
            </Link>
          </Menu.Target>
          <Menu.Dropdown zIndex={1000} className={classes.dropdown}>
            {menuItems}
          </Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} style={{textDecoration: 'none'}} passHref>
        <span className={classes.link}>
          {link.label}
        </span>
      </Link>
    );
  });
  return (
    <MantineProvider withGlobalStyles withCSSVariables>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group>
          <img src="https://i.ibb.co/V33fM1F/caricon.png" alt="Feliks-Dealership-Sa-2" border="0" width="50px"/>
          <img src="https://i.ibb.co/hYLP3jt/text.png" border="0" width="150px"/>
          </Group>
          <Group>
            <Group ml={50} gap={5} className={classes.links} visiblefrom="sm">
              {items}
            </Group>
            <Group visiblefrom="sm">
            {isLoggedIn ? (
                <Group className={classes.userInfoContainer}>
                <div className={classes.userDetails}>
                  <Link href="/userprofile" className={classes.link}>
                    <Avatar variant="transparent" radius="sm" src="" className={classes.userAva} />
                    <span className={classes.userLink}>
                      {userInfo && userInfo.username}
                    </span>
                  </Link>
                </div>
        
              </Group>
              ) : (
                <Group>
                  <Link href="/signin">
                  <Button onClick={handleLogin} variant="default">
                    Sign in
                  </Button>
                  </Link>
                  <Link href="/signup">
                  <Button>Sign up</Button>
                  </Link>
                </Group>
              )}
            </Group>
          </Group>
        </div>
      </header>
    </MantineProvider>
  );
}
