import axios from "./axiosInstance";

export type Colonia = {
  id: string;
  name: string;
  ubication: string;
  zone: string | number;
  size?: number;
};

export async function getColonias(): Promise<Colonia[]> {
  const response = await axios.get(`/colonies/colonies`);
  return response.data;
}

// getColoniasById
export async function getColoniasById(id: string): Promise<Colonia> {
  const response = await axios.get(`/colonies/colonies/${id}/`);
  return response.data;
}

//  createColonia
export async function createColonia(
  data: Omit<Colonia, "id">
): Promise<Colonia> {
  const response = await axios.post("/colonies/colonies/", data);
  return response.data;
}

// updateColonia
export async function updateColonia(
  id: string,
  data: Omit<Colonia, "id">
): Promise<Colonia> {
  const response = await axios.put(`/colonies/colonies/${id}/`, data);
  return response.data;
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

// create colony
export async function createColony(data: Omit<Colonia, "id">) {
  const response = await axios.post("/colonies/colonies/", data);
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

export async function getAllZones(params?: {
  locality?: string;
  name?: string;
}): Promise<Zone[]> {
  const response = await axios.get("/colonies/zones/", { params });
  return response.data;
}

// createZone
export async function createZone(data: Omit<Zone, "id">): Promise<Zone> {
  const response = await axios.post("/colonies/zones/", data);
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

export type Volunter = {
  id: number;
  name: string;
  email: string;
  day: string;
};
export async function getAvailableVolunteersByZone(
  zoneId: number
): Promise<Volunter[]> {
  const response = await axios.get(
    `/colonies/zones/${zoneId}/available-volunteers/`
  );
  return response.data;
}
