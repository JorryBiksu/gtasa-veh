import { API } from "../api/";

export async function userLogin(id) {
    const data = await API.get(`/auth/user-details/${id}`);
    return data;
}

// Other query functions...



export async function getUserBySkip (skip)  {
  const data = await API.get(`/get-user?skip=${skip}`)
  return data;
}

export async function getUserById(id) {
  const data = await API.get(`/user?id=${id}`)
  return data;
}

export async function addProduct(params) {
  const data = await API.post(`/add-product`, params)
  return data;
}

export async function editProduct(id,params) {
  const data = await API.put(`/edit-product?id=${id}`, params)
  return data;
}

export async function deleteProduct(id) {
  const data = await API.delete(`/delete-product?id=${id}`)
  return data;
}