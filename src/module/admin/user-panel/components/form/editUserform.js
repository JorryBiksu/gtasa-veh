import { editUser } from "@/common/query/product";
import { Button, Group, Modal, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { notifications } from '@mantine/notifications';

const handleValidateForm = (data, field) => {
  return (data === '' || data === null ? `${field} must filled` : null)
}

export default function EditUserForm(props) {
  const {isOpen} = props
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

  /**set data to form when form edit open */
  useEffect(()=>{
    form.setFieldValue('username', props.detailData.username);
    form.setFieldValue('password', props.detailData.password);
    form.setFieldValue('role', props.detailData.role);
  },[isOpen])

  const handleCloseModal = () => {
    props.onClose();
    form.reset();
  }

  const { mutate, isLoading } = useMutation(()=>editUser(props.detailData.id, form.values), {
    onSuccess: (response) => {
      if(response.status === 200) {
        handleCloseModal();
        props.refetch();
        notifications.show({
          title: 'Success',
          message: 'Success edited data!',
        })
      }
    },
    onError: () => {
      notifications.show({
        title: 'Failed',
        message: 'Failed edit data!',
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
        title="Edit User"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
       <form onSubmit={form.onSubmit(() => mutate())}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Input username"
            {...form.getInputProps('username')}
          />
          <Textarea
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