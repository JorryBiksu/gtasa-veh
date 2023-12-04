import { deleteProduct, getProducts } from "@/common/query/product";
import Layout from "@/components/Layout";
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { notifications } from '@mantine/notifications';

export default function ProductPage(){
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [idProduct, setIdProduct] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [detailData, setDetailData] = useState({
    id: null,
    title: '',
    description: '',
    category: ''
  });
  
  const { data: products, refetch, isFetching } = useQuery(['list-products', skip], () => getProducts(skip), {
    initialData: []
  });


  const onHandleChangePage = (page) => {
    const from = (page - 1) * 10;
    setPage(page)
    setSkip(from)
  }


  return (
    <>
      <Layout title='Dasboard'>
        <main>
          <section 
            style={{
              display:"flex", 
              justifyContent:"space-between",
              alignItems:"center"
            }}>
            <h1>Dashboard Page</h1>
          </section>
          <section>
            <DataTable
              withBorder
              minHeight={180}
              columns={[
                {
                  accessor: 'title',
                  title: 'Title',
                  width: 160,
                },
                {
                  accessor: 'category',
                  title: 'Category',
                  width: 160,
                },
                {
                  accessor: 'description',
                  title: 'Description',
                  width: 160,
                },
              ]}
              records={products.data?.products}
              fetching={isFetching}
              totalRecords={products.data?.totalData}
              recordsPerPage={10}
              page={page}
              onPageChange={(p) => onHandleChangePage(p)}
            />
          </section>
        </main>
      </Layout>
    </>
  )
}