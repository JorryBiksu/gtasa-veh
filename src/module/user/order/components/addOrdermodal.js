import { addOrder, addProduct } from "@/common/query/product";
import { Button, Group, Modal, Select, TextInput, Textarea, ColorInput, DEFAULT_THEME } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import checkLoggedInUser from "@/components/Layout/auth/ceklogin";
import { useRouter } from 'next/router';
import { useQuerySaveeh } from '@/features/home/service';

const handleValidateForm = (data, field) => {
  return (data === '' || data === null ? `${field} must be filled` : null);
}

export default function AddOrderModal(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  


  // Assume selectedItemId is stored somewhere, for example in the component state
  const [selectedItemId, setSelectedItemId] = useState(null);
  const loggedInUserId = userInfo ? userInfo.id : null;
  useEffect(() => {
    const user = checkLoggedInUser();
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
      
    }

    
    // Get the id from the URL query parameters
    const { id } = router.query;
    

    // Update the selectedItemId with the id from the URL
    setSelectedItemId(id || null);
  }, [router.query]);


  // Define the skip variable
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const onHandleChangePage = (page) => {
    const from = (page - 1) * 10;
    setPage(page);
    setSkip(from);
  };
  const { data, isFetching } = useQuerySaveeh(skip);
  console.log(data, isFetching);
  const form = useForm({
    initialValues: {
      username: '',
      address: '', // Change 'description' to 'address'
      category: selectedItemId || '',
      color: '',
      note: '',
      createdBy: '',
    },
    validate: {
      username: (value) => handleValidateForm(value, 'Your Name'),
      address: (value) => handleValidateForm(value, 'Address'),
      category: (value) => handleValidateForm(value, 'Category'),
      color: (value) => handleValidateForm(value, 'Color'),
      note: (value) => handleValidateForm(value, 'Note'),
      createdBy: (value) => handleValidateForm(value, 'createdBy'),

    },
  });
  
  const handleCloseModal = () => {
    props.onClose();
    form.reset();
  }

  const { mutate, isLoading } = useMutation(addOrder, {
    onSuccess: (response) => {
      if (response.status === 201) {
        notifications.show({
          title: 'Success',
          message: 'Success created data!',
        })
        router.push('/order-page');
      }
    },
    onError: () => {
      notifications.show({
        title: 'Failed',
        message: 'Failed to add data!',
        color: 'red',
      });
    },
  });
  useEffect(() => {
    if (loggedInUserId !== null) {
      // Set createdBy in form values when user information is available
      form.setFieldValue('createdBy', loggedInUserId);

      // Optionally, you can automatically submit the form here
      // form.submit();
    }
  }, [loggedInUserId]);
  console.log('selectedItemId:', selectedItemId);
console.log('data:', data);
console.log('form values:', form.values);
console.log('user :', loggedInUserId);

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
     <form onSubmit={form.onSubmit((values) => mutate({ ...values, createdBy: loggedInUserId }))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Input your full name"
          {...form.getInputProps('username')}
        />
        <Textarea
          style={{ marginTop: '10px' }}
          withAsterisk
          label="Address"
          placeholder="Input your address  (e.g Rodeo, Los Santos)"
          {...form.getInputProps('address')}
        />
        
        {/* Use the data from useQuerySaveeh for the Select options */}
        <Select
          label="Category"
          description="Please Re-select Item Selected 'Sorry For The Bug'"
          withAsterisk
          style={{ marginTop: "10px" }}
          placeholder="Pick one"
          data={data?.data.saveh.map(({ id, name, category }) => ({
            value: id.toString(),
            label: `${name} - ${category}`,
            disabled: selectedItemId !== null && id.toString() === selectedItemId,
          })) || []}

          value={selectedItemId || (data?.data.saveh.length > 0 ? data?.data.saveh[0].id.toString() : '')}
          onChange={(value) => {
            form.setFieldValue('category', value);
          }}
          {...form.getInputProps('category')}
          clearable
        />

<ColorInput 
        label="Pick Color"
        defaultValue="#C5D899" 
        format="rgb" 
        {...form.getInputProps('color')}
        />
        <TextInput
          withAsterisk
          label="Note"
          placeholder="Input your note"
          {...form.getInputProps('note')}
        />
      

        <Group align="flex-end" style={{ marginTop: '20px' }}>
          <Button type="submit" loading={isLoading}>
            Order
          </Button>
        </Group>
      </form>
      </Modal>
    </>
  );
}