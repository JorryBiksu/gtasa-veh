import { addUser } from "@/common/query/product";
import { Button, Group, Modal, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';

const handleValidateForm = (data, field) => {
  return (data === '' || data === null ? `${field} must filled` : null)
}

export default function AddUserForm(props) {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      role: '',
    },

    validate: {
      username: (value) => handleValidateForm(value, 'Username'),
      password: (value) => handleValidateForm(value, 'Password'),
      role: (value) => handleValidateForm(value, 'Role'),
    },
  });

  const handleCloseModal = () => {
    props.onClose();
    form.reset();
  }

  const { mutate, isLoading } = useMutation(addUser, {
    onSuccess: (response) => {
      if(response.status === 201) {
        handleCloseModal();
        props.refetch();
        notifications.show({
          title: 'Success',
          message: 'Success created user!',
        })
      }
    },
    onError: () => {
      notifications.show({
        title: 'Failed',
        message: 'Failed created user!',
        color: 'red'
      })
    }
  });

  return (
    <>
      <Modal
        opened={props.isOpen}
        withCloseButton
        onClose={handleCloseModal}
        size="md"
        radius="md"
        title="Add User"
        centered
      >
       <form onSubmit={form.onSubmit((values) => mutate(values))}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Input username"
            {...form.getInputProps('username')}
          />
          <TextInput
            style={{marginTop:"10px"}}
            withAsterisk
            label="Password"
            placeholder="Input user password"
            {...form.getInputProps('password')}
          />
          <Select
            label="Role"
            withAsterisk
            style={{marginTop:"10px"}}
            placeholder="Pick one"
            data={[
              { value: 'admin', label: 'Admin' },
              { value: 'User', label: 'User' },
            ]}
            {...form.getInputProps('role')}
          />
        <Group align="flex-end" style={{marginTop:"20px"}}>
          <Button
            type="submit"
            loading={isLoading}
          >
            Save
          </Button>
        </Group>
       </form>
      </Modal>
    </>
  )
}