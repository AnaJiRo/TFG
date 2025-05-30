import axios from "./axiosInstance";

export async function getColonies() {
  const response = await axios.get(
    "http://localhost:8000/api/colonies/colonies/assignments/summary/"
  );
  return response.data;
}

export async function getColonyDetails(id: string) {
  const response = await axios.get(
    `http://localhost:8000/api/colonies/colonies/${id}/`
  );
  return response.data;
}

export async function getAssignmentsByColony(id: string) {
  const response = await axios.get(
    `http://localhost:8000/api/colonies/colonies/${id}/assignments/`
  );
  return response.data;
}

export async function getSummaryByColony(id: string) {
  const response = await axios.get(
    `http://localhost:8000/api/colonies/colonies/assignments/summary/${id}`
  );
  return response.data;
}

export async function availableVolunteersByColony(id: string) {
  const response = await axios.get(
    `http://localhost:8000/api/colonies/colonies/${id}/available-assignments/ `
  );
  return response.data;
}

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
