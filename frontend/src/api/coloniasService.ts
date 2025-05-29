import axios from './axiosInstance';
import { Colonia } from '../types';

export async function getColonias(): Promise<Colonia[]> {
  const response = await axios.get('/colonias/');
  return response.data; // Ajustar con el back
}
