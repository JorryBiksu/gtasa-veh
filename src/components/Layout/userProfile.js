import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Text, Button, Card, Modal, Group, Image, Title} from '@mantine/core';
import checkLoggedInUser from './auth/ceklogin';
import styles from '../../styles/UserInfoAction.module.css';
import Link from 'next/link';

export function UserInfoAction() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = checkLoggedInUser();
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
      console.log('userInfo:', user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserInfo(null);
    router.push('/');
  };

  return (
    <div className={styles.userprofile}>
      <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.container}>
      <Card.Section position="relative" className={styles.imageContainer}>
    <Image
      src="https://c4.wallpaperflare.com/wallpaper/385/908/1002/gta-san-andreas-grand-theft-auto-san-andreas-grand-theft-auto-4k-unreal-engine-4-hd-wallpaper-preview.jpg"
      height={160}
      alt="Norway"
    />
    <div className={styles.avatarOverlay}>
      <Avatar src="" size={120} radius={120} variant="light" className={styles.avatar} />
    </div>
  </Card.Section>
  <Title order={3} className={styles.username}>
          {userInfo && userInfo.username}
        </Title>
        <Text ta="center" fz="sm" fw={50} mt="sm" className={styles.role}>
          {userInfo && userInfo.role.toLowerCase()}
        </Text>
        <Text ta="center" fz="sm" fw={50} mt="sm" className={styles.ca}>
        <Link href={'/signin'} className={styles.ca}>
          Change Account
        </Link>
        </Text>
        
        <Button onClick={() => setShowModal(true)} variant="outline" color="red" className={styles.logoutButton}>
          Log out
        </Button>

        <Modal
          opened={showModal}
          withCloseButton
          onClose={() => setShowModal(false)}
          size="sm"
          radius="md"
          title="Logout Confirmation"
          centered
        >
          <Text size="sm" mb="sm" weight={500}>
            Are you sure for logout?
          </Text>

          <Group align="flex-end">
            <Button
              color="red"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Group>
        </Modal>
      </Card>
    </div>
  );
}
