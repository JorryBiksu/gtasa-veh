// Import the necessary components
import ProgressBar from "nextjs-progressbar";
import { notifications } from '@mantine/notifications';
import { Overlay, Container, Title, Button, Text, Group, Notification } from "@mantine/core";
import classes from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import checkLoggedInUser from "@/components/Layout/auth/ceklogin"; // Adjust the path as needed
import { useState } from "react";
import { Phone, BrandGmail, BrandDiscord} from 'tabler-icons-react';

export function AboutPage() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const handleGetStarted = () => {
    const isLoggedIn = checkLoggedInUser();

    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      notifications.show({
        color: 'red',
        title: '⚠Oops!',
        message: 'You are not signed in yet, please signin first',
      })
      router.push("/signin");
    }
  };

  return (
<div className={classes.hero}>
  <ProgressBar color="#64ffda" height={3} />
  <Overlay gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)" opacity={showNotification ? 1 : 0} zIndex={showNotification ? 1000 : 0} />
  <Container className={classes.container} size="md">
    <Group className={classes.item}>
      <Title className={classes.titles} mt={100}>About</Title>
      <Text className={classes.description} size="xl" mt="xl">
      This website is created to facilitate members on the roleplay server in providing a more enjoyable roleplay experience. 
      The website is still in development and not final; 
      it may be continued if the developer is not lazy. 
      Here, we use React.js, Prisma, Postgres, Railway.app, Mantine, Vercel, and other dependencies to develop our website. We appreciate your assistance in further developing this website.
      </Text>

      {/* Add margin-top class to create space between sections */}
      <Title className={`${classes.title} ${classes.marginTop}`} mt={100}>Contact us</Title>
      <div>
  <Text className={classes.description}>
    <Phone style={{ verticalAlign: 'middle' }} /> Phone: 334 555
  </Text>
  <Text className={classes.description}>
    <BrandGmail style={{ verticalAlign: 'middle' }} /> Email: arryjonathan1@gmail.com
  </Text>
  <Text className={classes.description}>
    <BrandDiscord style={{ verticalAlign: 'middle' }} /> Discord: jorrykunn a.k.a Jorry Kunn#1289
  </Text>
</div>
    </Group>
  </Container>
</div>


    
  );
}
