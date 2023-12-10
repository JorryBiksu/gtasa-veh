import { API } from "../api/";

export async function getUserBySkip (skip)  {
  const data = await API.get(`/get-user?skip=${skip}`)
  return data;
}

export async function getUserById(id) {
  const data = await API.get(`/user?id=${id}`)
  return data;
}

export async function addUser(params) {
  const data = await API.post(`/add-user`, params)
  return data;
}
export async function registerUser(params) {
  const data = await API.post(`/register`, params)
  return data;
}

export async function editUser(id,params) {
  const data = await API.put(`/edit-user?id=${id}`, params)
  return data;
}

export async function deleteUser(id) {
  const data = await API.delete(`/delete-user?id=${id}`)
  return data;
}

//saveh
export async function getSavehBySkip (skip)  {
  const data = await API.get(`/get-saveh?skip=${skip}`)
  return data;
}

export async function getSavehById(id) {
  const data = await API.get(`/saveh?id=${id}`)
  return data;
}

export async function addSaveh(params) {
  const data = await API.post(`/add-saveh`, params)
  return data;
}

export async function editSaveh(id,params) {
  const data = await API.put(`/edit-saveh?id=${id}`, params)
  return data;
}

export async function deleteSaveh(id) {
  const data = await API.delete(`/delete-saveh?id=${id}`)
  return data;
}
//order
export async function getOrderBySkip (skip, sortBy = { field: 'id', order: 'asc' })  {
  const { field, order } = sortBy;
  const data = await API.get(`/get-order?skip=${skip}&sortBy=${field}&order=${order}`);
  return data;
}

// common/query/product.js

// common/query/product.js

// common/query/product.js

export async function getOrdersBySkip(skip, userId, admin, sortBy = { field: 'id', order: 'asc' }) {
  const { field, order } = sortBy;
  let apiUrl = `/get-orders?skip=${skip}&sortBy=${field}&order=${order}`;

  if (!admin) {
    apiUrl += `&createdBy=${userId}`;
  }

  const data = await API.get(apiUrl);

  // Cache the data in localStorage
  localStorage.setItem(apiUrl, JSON.stringify(data));

  return data;
}





export async function getOrderById(id) {
  const data = await API.get(`/order?id=${id}`)
  return data;
}

export async function addOrder(params) {
  const data = await API.post(`/add-order`, params)
  return data;
}

export async function editOrder(id,params) {
  const data = await API.put(`/edit-order?id=${id}`, params)
  return data;
}

export async function deleteOrder(id) {
  const data = await API.delete(`/delete-order?id=${id}`)
  return data;
}