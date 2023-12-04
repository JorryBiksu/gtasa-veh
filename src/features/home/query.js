import { API } from "@/common/api";

export async function getUserBySkip(skip) {
  const data = await API.get(`/get-user?skip=${skip}`)
  return data;
}

