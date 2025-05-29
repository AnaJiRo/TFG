// Obtener colonias
export async function getColonies() {
  const response = await axios.get(
    "http://localhost:8000/api/colonies/colonies/assignments/summary/"
  );
  return response.data;
}
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
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export async function registerUser(data: RegisterPayload) {
  const response = await axios.post("/register/", data); // ajusta la ruta según tu backend
  return response.data;
}
