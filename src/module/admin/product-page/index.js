import { deleteSaveh, getSavehBySkip } from "@/common/query/product";
import Layout from "@/components/Layout/Layout";
import { Box, Container, ActionIcon, Button, Group, Modal, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import AddProductForm from "./components/form/addProductForm";
import EditProductForm from "./components/form/editProductform";
import { notifications } from '@mantine/notifications';
import { useEffect } from "react";
import classes from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import checkLoggedInUser from "@/components/Layout/auth/ceklogin";

export default function ProductPage(){
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [skip, setSkip] = useState(0);
  const [idUser, setIdUser] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [detailData, setDetailData] = useState({
    id: null,
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
  });
  
  useEffect(() => {
    const user = checkLoggedInUser();
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
      console.log('userInfo:', user);
    }
  }, []);

  useEffect(() => {
    const user = checkLoggedInUser();
    if (!user) {
      notifications.show({
        color: 'red',
        title: '⚠Oops!',
        message: 'You are not signed in yet, please signin first',
      })
      router.push("/signin");
    }
  }, []);

  useEffect(() => {
    // Check user role here
    if (userInfo && userInfo.role !== 'admin') {
      // Redirect or handle access denied
      console.log('Access denied');
      notifications.show({
        color: 'red',
        title: '⚠Sorry!',
        message: 'You are not admin, cannot access this page',
      })
      router.push('/dashboard');

    }
  }, [userInfo]);

  const { data: saveh, refetch, isFetching } = useQuery(['list-saveh', skip], () => getSavehBySkip(skip), {
    initialData: []
  });

  const { mutate, isLoading: isLoadingDelete } = useMutation(deleteSaveh, {
    onSuccess: (response) => {
      if(response.status === 200) {
        setIsOpenDelete(false);
        refetch();
        notifications.show({
          title: 'Success',
          message: 'Success deleted data!',
        })
      }
    },
    onError: () => {
      notifications.show({
        title: 'Failed',
        message: 'Failed deleted data!',
        color: 'red'
      })
    }
  });

  const onHandleChangePage = (page) => {
    const from = (page - 1) * 10;
    setPage(page)
    setSkip(from)
  }

  const onHandleDeleteData = (isOpen, id) => {
    setIsOpenDelete(isOpen)
    setIdUser(id)
  }

  const onHandleEditData = (isOpen, data) => {
    const editData = {
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      category: data.category,
      id: data.id
    }
    setDetailData(editData)
    setIsOpenEdit(isOpen)
  }

  

  return (
    <>
    <Layout title='User Page'>
      <main className={classes.heroup}> 
      <Container className={classes.containerup} size="md">
      <div className={classes.containerupcontent}>
          <section 
            style={{
              display:"flex", 
              justifyContent:"space-between",
              alignItems:"center"
            }}>
            <Title order={1} style={{marginBottom:"10px"}}>List Product</Title>
            <Button
              onClick={()=>setIsOpenAdd(true)}
            >
              Add Product
            </Button>
          </section>
          <section className={classes.containerup}>
          <Box sx={{ height: 250 }} className={classes.containerup}>
            <DataTable             
              minHeight={510}
              columns={[
                {
                  accessor: 'id',
                  title: 'ID',
                  width: 160,
                },
                {
                  accessor: 'name',
                  title: 'Username',
                  width: 160,
                },
                {
                  accessor: 'description',
                  title: 'Description',
                  width: 160,
                },
                {
                  accessor: 'image',
                  title: 'Image',
                  width: 160,
                  render: (data) => (
                    <img
                      src={data.image} // Assuming 'image' property contains the image URL
                      alt="Product Image"
                      style={{ width: '50px', height: '50px'}}
                    />
                  ),
                },
                {
                  accessor: 'price',
                  title: 'Price',
                  width: 160,
                },
                {
                  accessor: 'category',
                  title: 'Category',
                  width: 160,
                },
                {
                  accessor: 'actions',
                  title: <Text>Action</Text>,
                  textAlignment: 'center',
                  width: 80,
                  render: (data) => (
                    <Group spacing={4} position="center" noWrap>
                      <ActionIcon color="blue" onClick={() => onHandleEditData(true, data)}>
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon color="red" onClick={() => onHandleDeleteData(true, data.id)}>
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  ),
                },
              ]}
              records={saveh.data?.saveh}
              fetching={isFetching}
              totalRecords={saveh.data?.totalData}
              recordsPerPage={5}
              page={page}
              onPageChange={(p) => onHandleChangePage(p)}
              sortBy={{ field: 'id', order: 'asc' }} 
            />
            </Box>
          </section>
          </div>
          </Container>
        </main>
        <Modal
          opened={isOpenDelete}
          withCloseButton
          onClose={() => setIsOpenDelete(false)}
          size="sm"
          radius="md"
          title="Konfirmasi hapus data"
          centered
        >
          <Text size="sm" mb="sm" weight={500}>
            Apakah yakin ingin menghapus data ini?
          </Text>

          <Group align="flex-end">
            <Button
              color="red"
              onClick={() => mutate(idUser)}
              loading={isLoadingDelete}
            >
              Hapus
            </Button>
          </Group>
        </Modal>

        <AddProductForm
          isOpen={isOpenAdd} 
          onClose={()=>setIsOpenAdd(false)} 
          refetch={refetch}
        />

        <EditProductForm 
          isOpen={isOpenEdit} 
          onClose={()=>setIsOpenEdit(false)} 
          refetch={refetch}
          detailData={detailData}
        />
        </Layout>
    </>
  )
}