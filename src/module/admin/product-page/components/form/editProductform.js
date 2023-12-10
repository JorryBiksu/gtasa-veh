import { editSaveh } from "@/common/query/product";
import { Button, Group, Modal, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { notifications } from '@mantine/notifications';
import Link from "next/link";

const handleValidateForm = (data, field) => {
  return (data === '' || data === null ? `${field} must filled` : null)
}

export default function EditProductForm(props) {
  const {isOpen} = props
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      image: '',
      price: '',
      category: '',
    },

    validate: {
      name: (value) => handleValidateForm(value, 'Name'),
      description: (value) => handleValidateForm(value, 'Description'),
      image: (value) => handleValidateForm(value, 'Image'),
      price: (value) => handleValidateForm(value, 'Price'),
      category: (value) => handleValidateForm(value, 'Category'),
    },
  });

  /**set data to form when form edit open */
  useEffect(()=>{
    form.setFieldValue('name', props.detailData.name);
    form.setFieldValue('description', props.detailData.description);
    form.setFieldValue('image', props.detailData.image);
    form.setFieldValue('price', props.detailData.price);
    form.setFieldValue('category', props.detailData.category);
  },[isOpen])

  const handleCloseModal = () => {
    props.onClose();
    form.reset();
  }

  const { mutate, isLoading } = useMutation(()=>editSaveh(props.detailData.id, form.values), {
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

  console.log('form values:', form.values);
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
      >
       <form onSubmit={form.onSubmit(() => mutate())}>
       <TextInput
            withAsterisk
            label="Name"
            placeholder="Input vehicle name"
            {...form.getInputProps('name')}
          />
          <Textarea
            style={{marginTop:"10px"}}
            withAsterisk
            label="Description"
            placeholder="Input vehicle description"
            {...form.getInputProps('description')}
          />
          <TextInput
            withAsterisk
            label="Image"
            description="Please search the URL image in there" 
            placeholder="Input vehicle image"
            {...form.getInputProps('image')}
          />
    <TextInput
            withAsterisk
            label="Price"
            placeholder="Input vehicle price"
            {...form.getInputProps('price')}
          />
          <Select
            label="Category"
            withAsterisk
            style={{marginTop:"10px"}}
            placeholder="Pick one"
            data={[
              { value: 'Cars', label: 'Cars' },
              { value: 'Bike', label: 'Bike' },
              { value: 'Boat', label: 'Boat' },
              { value: 'Aircraft', label: 'Aircraft' },
            ]}
            {...form.getInputProps('category')}
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