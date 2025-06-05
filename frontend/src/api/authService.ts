import axios from "./axiosInstance";

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginPayload) {
  const response = await axios.post("/users/token/", data);
  return response.data;
}

type RegisterPayload = {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
};

export async function registerUser(data: RegisterPayload) {
  const response = await axios.post("/users/register/", data); // ajusta la ruta según tu backend
  return response.data;
}

export type User = {
  id: string;
  username: string;
  name: string;
  lastname?: string;
  email: string;
  phone: string;
  role: string;
};

export async function getUsers(): Promise<User[]> {
  const response = await axios.get("/users/");
  return response.data;
}

export async function getUserById(userId: string): Promise<User> {
  const response = await axios.get(`/users/${userId}/`);
  return response.data;
}

export async function updateUser(
  userId: string,
  data: Partial<Omit<User, "id">>
): Promise<User> {
  const response = await axios.put(`/users/${userId}/update/`, data);
  return response.data;
}

export async function deleteUser(userId: string): Promise<void> {
  await axios.delete(`/users/${userId}/delete/`);
}
