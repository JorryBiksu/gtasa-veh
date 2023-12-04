import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button, } from '@mantine/core';
import classes from '../../../styles/AuthenticationTitle.module.css';
import Link from 'next/link';

export function RegistAuth() {
    return (<Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Create Your Account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Have an account?{' '}
          <Link href="/signin">
          <Anchor size="sm" component="button">
            Sign in
          </Anchor>
          </Link>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Username" placeholder="Your username" required/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
          <Button fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>
      </Container>);
}