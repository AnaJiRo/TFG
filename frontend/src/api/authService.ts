import axios from './axiosInstance';

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginPayload) {
  const response = await axios.post('/users/token/', data);
  return response.data;
}
