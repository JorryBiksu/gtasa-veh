import { addSaveh } from "@/common/query/product";
import { Button, Group, Modal, Select, TextInput, Textarea, FileInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';

const handleValidateForm = (data, field) => {
  return (data === '' || data === null ? `${field} must filled` : null)
}

export default function AddProductForm(props) {
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

  const handleCloseModal = () => {
    props.onClose();
    form.reset();
  }

  const { mutate, isLoading } = useMutation(addSaveh, {
    onSuccess: (response) => {
      if(response.status === 201) {
        handleCloseModal();
        props.refetch();
        notifications.show({
          title: 'Success',
          message: 'Success created product!',
        })
      }
    },
    onError: () => {
      notifications.show({
        title: 'Failed',
        message: 'Failed created product!',
        color: 'red'
      })
    }
  });
console.log(form.values)
  return (
    <>
      <Modal
        opened={props.isOpen}
        withCloseButton
        onClose={handleCloseModal}
        size="md"
        radius="md"
        title="Add Product"
        centered
      >
       <form onSubmit={form.onSubmit((values) => mutate(values))}>
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
  description={
    <div>
      Please search the URL image in there
      {' '}
      <a
        href="https://www.gtavision.com/index.php?section=content&site=122"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.gtavision.com/index.php?section=content&site=122
      </a>
    </div>
  }
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
            Add
          </Button>
        </Group>
       </form>
      </Modal>
    </>
  )
}