import { useState } from 'react';
import { Menu, Group, Center, Button, MantineProvider, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { Logo } from './_logo';
import classes from '../../styles/HeaderMenu.module.css';
import Link from 'next/link';



const links = [
  { link: '/about', label: 'Features' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

export function HeaderMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserInfo({ username: 'User123' }); // Buka modal setelah login
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));
  
    if (menuItems) {
      return (
        
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown zIndex={1000}>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }
  
    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
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
                <Group>
                  <span className={classes.userInfo}>{userInfo.username}</span>
                  <Button variant="default">Log out</Button>
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
