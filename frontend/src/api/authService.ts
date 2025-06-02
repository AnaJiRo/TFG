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

export async function getUsers() {
  const response = await axios.get('/users/');
  return response.data
}