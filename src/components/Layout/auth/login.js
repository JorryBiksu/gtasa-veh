// components/Layout/auth/login.js
import { useState } from 'react';
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button, Notification, } from '@mantine/core';
import classes from '../../../styles/AuthenticationTitle.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API } from '@/common/api';
import { notifications } from '@mantine/notifications';

const login = ({ username, password }) => {
  return API.post(`/login`, { username, password })
    .then(response => response.data);
};

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const queryClients = useQueryClient(); // Use useQueryClient hook to get the query client instance
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data));
      const welcomeMessage = `Hello, ${data.username}!`;
      // Redirect to the dashboard based on the user role or any other logic
      if (data.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (data.role === 'User') {
        router.push('/dashboard');
      }
      notifications.show({
        color: 'green',
        title: '✅Success',
        message: welcomeMessage,
      })
      
      // You can add more roles and redirection logic as needed
    },

  onError: (error) => {
    // Handle specific HTTP status codes
    if (error.response?.status === 401) {
      // Unauthorized (Login failed)
      notifications.show({
        color: 'red',
        title: '⚠Oops!',
        message: 'You are not signed in yet, please signin first',
      })
    } else {
      // Other error
      notifications.show({
        color: 'red',
        title: '⚠ Failed',
        message: 'Please check your correct username or password.',
      });
    }
  },
});

  const handleLogin = () => {
    mutation.mutate({ username, password });
  };

  return (
    <div className={classes.auth}>
      <Container size={420} my={40} className={classes.container}>
        <Title ta="center" className={classes.title}>
          Welcome Back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Don&apos;t have an account?{' '}
          <Link href="/signup">
          <Anchor size="sm" component="button">
            Sign up
          </Anchor>
          </Link>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Username" placeholder="Your username" onChange={(e) => setUsername(e.target.value)} required/>
          <PasswordInput label="Password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} required mt="md"/>
          <Button fullWidth mt="xl" onClick={handleLogin} loading={mutation.isLoading}>
            Sign in
          </Button>
          <Text c="dimmed" size="sm" ta="center" mt={5} style={{ cursor: 'pointer' }} onClick={() => router.back()}>
            ← Go back
          </Text>

        </Paper>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Bug?{' '}
          <Link href="/">
          <Anchor size="sm" component="button">
            Fix Bug
          </Anchor>
          </Link>
        </Text>
      </Container>
    
    </div>
  );
};

export default Login;
