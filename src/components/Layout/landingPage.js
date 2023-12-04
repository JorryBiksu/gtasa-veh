import { Overlay, Container, Title, Button, Text, Group,  MantineColor, MantineProvider } from '@mantine/core';
import classes from '../../styles/Home.module.css';

export function LandingPage() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Group className={classes.item}>
        <Title className={classes.title}>Best dealership in San Andreas</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Build fully functional accessible web applications faster than ever – Mantine includes
          more than 120 customizable components and hooks to cover you in any situation
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
          Get started
        </Button>
        </Group>
      </Container>
    </div>
  );
}