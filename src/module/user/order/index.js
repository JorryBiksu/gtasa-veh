import { deleteOrder, getOrderBySkip, getOrdersBySkip, getOrdesrBySkip } from "@/common/query/product";
import Layout from "@/components/Layout/Layout";
import { Container, ActionIcon, Button, Group, Modal, Text, Title, Box } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import AddOrderModal from "./components/addOrdermodal";
import EditOrderForm from "./components/editOrderform";
import { notifications } from '@mantine/notifications';
import { useEffect } from "react";
import classes from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import checkLoggedInUser from "@/components/Layout/auth/ceklogin";

export default function OrderPage(){
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [skip, setSkip] = useState(0);
  const [idOrder, setIdOrder] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [detailData, setDetailData] = useState({
    id: null,
    username: '',    
    category: '',
    color: '',
    address: '',
    status: '',
    note: '',
    createdBy: '',
  });
  console.log('islogin',isLoggedIn)
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

  const { data: order, refetch, isFetching } = useQuery(
    ['list-order', skip, userInfo?.id, userInfo?.role === 'admin'],
    () => getOrdersBySkip(skip, userInfo?.id, userInfo?.role === 'admin'),
    {
      initialData: [],
    }
  );
  
  

  const { mutate, isLoading: isLoadingDelete } = useMutation(deleteOrder, {
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
    console.log('Deleting data with id:', id);
    setIsOpenDelete(isOpen)
    setIdOrder(id)
  }

  const onHandleEditData = (isOpen, data) => {
    const editData = {
      username: data.username,	
      category: data.category,	
      color: data.color,
      address: data.address,	
      note: data.note,
      status: data.status,
      id: data.id,
      
    }
    console.log("ajajaj", data.category)
    setDetailData(editData)
    setIsOpenEdit(isOpen)
  }

  

  return (
    <>
    <Layout title='Order Page'>
      <main className={classes.heroup}> 
      <Container className={classes.containerup} size="md">
      <div className={classes.containerupcontent}>
          <section 
            style={{
              display:"flex", 
              justifyContent:"space-between",
              alignItems:"center"
            }}>
            <Title order={1} style={{marginBottom:"10px"}}>List Order</Title>
            <Button
              onClick={()=>setIsOpenAdd(true)}
            >
              Add Another Order
            </Button>
          </section>
          <section>
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
                  accessor: 'username',
                  title: 'Username',
                  width: 160,
                },
                {
                  accessor: 'category',
                  title: 'Item',
                  width: 160,
                },
                {
                  accessor: 'color',
                  title: 'Color',
                  width: 160,
                },
                {
                  accessor: 'address',
                  title: 'Address',
                  width: 160,
                },
                {
                  accessor: 'status',
                  title: 'Status',
                  width: 160,
                },
                {
                  accessor: 'note',
                  title: 'Note',
                  width: 160,
                },
                {
                  accessor: 'createdBy',
                  title: 'Created By',
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
              records={order.data?.order}
              fetching={isFetching}
              totalRecords={order.data?.totalData}
              recordsPerPage={10}
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
              onClick={() => mutate(idOrder)}
              loading={isLoadingDelete}
            >
              Hapus
            </Button>
          </Group>
        </Modal>
        <AddOrderModal
          isOpen={isOpenAdd} 
          onClose={()=>setIsOpenAdd(false)} 
          refetch={refetch}
        />

        <EditOrderForm 
          isOpen={isOpenEdit} 
          onClose={()=>setIsOpenEdit(false)} 
          refetch={refetch}
          detailData={detailData}
        />
        </Layout>
    </>
  )
}