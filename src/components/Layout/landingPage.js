// Import the necessary components
import ProgressBar from "nextjs-progressbar";
import { notifications } from '@mantine/notifications';
import { Overlay, Container, Title, Button, Text, Group, Notification } from "@mantine/core";
import classes from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import checkLoggedInUser from "./auth/ceklogin"; // Adjust the path as needed
import { useState } from "react";

export function LandingPage() {
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
          <Title className={classes.title}>Best dealership in San Andreas</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Build fully functional accessible web applications faster than ever – Mantine includes more than 120 customizable components and hooks to cover you in any situation
          </Text>

          <Button variant="gradient" size="xl" radius="xl" className={classes.control} onClick={handleGetStarted}>
            Get started
          </Button>
        </Group>
      </Container>
    </div>
  );
}
