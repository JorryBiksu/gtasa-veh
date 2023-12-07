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