// components/login.js atau tempat yang sesuai
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Button, Input, Notification } from '@mantine/core';
import axios from 'axios';
import { API } from '@/common/api';

const login = ({ username, password }) => {
  return API.post(`/login`, { username, password })
    .then(response => response.data);
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      // Redirect atau lakukan tindakan lain setelah login berhasil
    },
  });

  const handleLogin = () => {
    mutation.mutate({ username, password });
  };

  return (
    <div>
      <Input
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} loading={mutation.isLoading}>
        Login
      </Button>
      {mutation.isError && mutation.error && (
        <Notification type="error">{mutation.error.message}</Notification>
      )}
    </div>
  );
};

export default Login;
