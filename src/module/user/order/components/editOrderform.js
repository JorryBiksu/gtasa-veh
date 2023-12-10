import { editOrder } from "@/common/query/product";;
import { Grid, ScrollArea, Button, Group, Modal, Select, TextInput, Textarea, ColorInput, DEFAULT_THEME } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import checkLoggedInUser from "@/components/Layout/auth/ceklogin";
import { useRouter } from 'next/router';
import { useQuerySaveeh } from '@/features/home/service';

const handleValidateForm = (data, field) => {
  return (data === '' || data === null ? `${field} must filled` : null)
}

export default function EditOrderForm(props) {
  const {isOpen, onClose, refetch, detailData} = props
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  


  // Assume selectedItemId is stored somewhere, for example in the component state
  const [selectedItemId, setSelectedItemId] = useState(null);
  const loggedInUserId = userInfo ? userInfo.id : null;
  const isAdmin = userInfo?.role === 'admin';
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
      status: '',
    },
    validate: {
      username: (value) => handleValidateForm(value, 'Your Name'),
      address: (value) => handleValidateForm(value, 'Address'),
      category: (value) => handleValidateForm(value, 'Category'),
      color: (value) => handleValidateForm(value, 'Color'),
      note: (value) => handleValidateForm(value, 'Note'),
      status: (value) => handleValidateForm(value, 'Status'),

    },
  });
  
  useEffect(()=>{
    form.setFieldValue('username', props.detailData.username);
    form.setFieldValue('address', props.detailData.address);
    form.setFieldValue('category', props.detailData.category);
    form.setFieldValue('color', props.detailData.color);
    form.setFieldValue('note', props.detailData.note);
    form.setFieldValue('status', props.detailData.status);
  },[isOpen])


  const handleCloseModal = () => {
    props.onClose();
    form.reset();
  }

  const { mutate, isLoading } = useMutation(()=>editOrder(props.detailData.id, form.values), {
    onSuccess: (response) => {
      if (response.status === 200) {
        notifications.show({
          title: 'Success',
          message: 'Success update data!',
        })
        router.reload();
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
 
  console.log('selectedItemId:', selectedItemId);
console.log('data:', data);
console.log('form values:', form.values);
console.log('user :', loggedInUserId);
console.log('user :', props.detailData.status);

  return (
    <>
      <Modal
        opened={props.isOpen}
        withCloseButton
        onClose={handleCloseModal}
        size="md"
        radius="md"
        title="Edit Product"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
      <form onSubmit={form.onSubmit(() => mutate())}>
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
        
        {
  router.query.id === undefined ? (
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
  ) : (
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
    {...form.getInputProps('category')}
    value={selectedItemId || (data?.data.saveh.length > 0 ? data?.data.saveh[0].id.toString() : '')}
    onChange={(value) => {
      form.setFieldValue('category', value);
    }}
    clearable
  />
  )
}


<ColorInput 
        label="Pick Color"
        defaultValue="#C5D899" 
        format="rgb" 
        {...form.getInputProps('color')}
        />
        <Grid>
          <Grid.Col span={6}>
            {/* Status */}
            {isAdmin && (
              <Select
                label="Status"
                withAsterisk
                style={{ marginTop: '10px' }}
                placeholder="Pick one"
                data={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'rejected', label: 'Rejected' },
                ]}
                value={form.values.status || props.detailData.status}
                onChange={(value) => {
                  form.setFieldValue('status', value);
                }}
                {...form.getInputProps('status')}
                clearable
              />
            )}
          </Grid.Col>
          
          <Grid.Col span={6}>
            {/* Note */}
            <TextInput
              withAsterisk
              label="Note"
              placeholder="Input your note"
              style={{ marginTop: '10px' }}
              {...form.getInputProps('note')}
            />
          </Grid.Col>
        </Grid>
      

        <Group align="flex-end" style={{ marginTop: '20px' }}>
          <Button type="submit" loading={isLoading}>
            Save
          </Button>
        </Group>
      </form>
      </Modal>
    </>
  )
}