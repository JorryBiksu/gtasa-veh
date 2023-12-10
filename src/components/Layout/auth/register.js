import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button, } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import classes from '../../../styles/AuthenticationTitle.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { registerUser } from '@/common/query/product';

const handleValidateForm = (data, field) => {
  return (data === '' || data === null ? `${field} must filled` : null)
}

export function RegistAuth() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => handleValidateForm(value, 'Username'),
      password: (value) => handleValidateForm(value, 'Password'),
    },
  });

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: (response) => {
      if(response.status === 201) {
        notifications.show({
          title: 'Success',
          message: 'Success register!',
        })
        router.push('/signin');
      }
    },
    onError: () => {
      notifications.show({
        title: 'Failed',
        message: 'Failed register!',
        color: 'red'
      })
    }
  });
    return (
      <div className={classes.auths}>
      <Container size={420} my={40} className={classes.container}>
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
        <form onSubmit={form.onSubmit((values) => mutate(values))}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Username" placeholder="Your username" required {...form.getInputProps('username')}/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')}/>
          <Button fullWidth mt="xl" type="submit"
            loading={isLoading}>
            Sign up
          </Button>
        </Paper>
        </form>
      </Container>
      </div>
      );
}