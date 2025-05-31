import axios from "./axiosInstance";
import { Colonia } from "../types";

export async function getColonias(): Promise<Colonia[]> {
  const response = await axios.get("/colonias/");
  return response.data; // Ajustar con el back
}

export async function getColonies() {
  const response = await axios.get("/colonies/colonies/assignments/summary/");
  return response.data;
}

export async function getColonyDetails(id: string) {
  const response = await axios.get(`/colonies/colonies/${id}/`);
  return response.data;
}

export async function getAssignmentsByColony(id: string) {
  const response = await axios.get(`/colonies/colonies/${id}/assignments/`);
  return response.data;
}

export async function getSummaryByColony(id: string) {
  const response = await axios.get(
    `/colonies/colonies/assignments/summary/${id}`
  );
  return response.data;
}

export async function availableVolunteersByColony(id: string) {
  const response = await axios.get(
    `/colonies/colonies/${id}/available-assignments/`
  );
  return response.data;
}

export async function createBulkAssignments(
  id: string,
  assignments: Record<string, number | null>
) {
  const response = await axios.put(
    `/colonies/colonies/${id}/assignments/bulk/`,
    assignments
  );
  return response.data;
}

export type Zone = {
  id: number;
  name: string;
  locality: string;
};
export async function getAllZones(): Promise<Zone[]> {
  const response = await axios.get("/colonies/zones/");
  return response.data;
}

export type availability = {
  user: number;
  day: string;
  zone: number;
};

// create availability
export async function createAvailability(
  data: availability
): Promise<availability> {
  const response = await axios.post("/users/availability/", data);
  return response.data;
}
