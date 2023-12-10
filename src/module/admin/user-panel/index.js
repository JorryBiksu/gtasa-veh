import { deleteUser, getUserBySkip } from "@/common/query/product";
import Layout from "@/components/Layout/Layout";
import { Container, ActionIcon, Button, Group, Modal, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import AddUserForm from "./components/form/addUserForm";
import EditUserForm from "./components/form/editUserform";
import { notifications } from '@mantine/notifications';
import { useEffect } from "react";
import classes from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import checkLoggedInUser from "@/components/Layout/auth/ceklogin";

export default function UserPage(){
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
    username: '',
    password: '',
    role: ''
  });
  
  useEffect(() => {
    const user = checkLoggedInUser();
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
      console.log('userInfo:', user);
    }
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      notifications.show({
        color: 'red',
        title: '⚠Oops!',
        message: 'You are not signed in yet, please signin first',
      })
      router.push("/signin");
    }
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      notifications.show({
        color: 'red',
        title: '⚠Oops!',
        message: 'You are not signed in yet, please signin first',
      })
      router.push("/signin");
    }
  },[]);

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

  const { data: user, refetch, isFetching } = useQuery(['list-user', skip], () => getUserBySkip(skip), {
    initialData: []
  });

  const { mutate, isLoading: isLoadingDelete } = useMutation(deleteUser, {
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
      username: data.username,
      password: data.password,
      role: data.role,
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
            <Title order={1} style={{marginBottom:"10px"}}>List User</Title>
            <Button
              onClick={()=>setIsOpenAdd(true)}
            >
              Add User
            </Button>
          </section>
          <section>
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
                  accessor: 'password',
                  title: 'Password',
                  width: 160,
                },
                {
                  accessor: 'role',
                  title: 'Role',
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
              records={user.data?.user}
              fetching={isFetching}
              totalRecords={user.data?.totalData}
              recordsPerPage={10}
              page={page}
              onPageChange={(p) => onHandleChangePage(p)}
              sortBy={{ field: 'id', order: 'asc' }} 
            />
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

        <AddUserForm 
          isOpen={isOpenAdd} 
          onClose={()=>setIsOpenAdd(false)} 
          refetch={refetch}
        />

        <EditUserForm 
          isOpen={isOpenEdit} 
          onClose={()=>setIsOpenEdit(false)} 
          refetch={refetch}
          detailData={detailData}
        />
        </Layout>
    </>
  )
}