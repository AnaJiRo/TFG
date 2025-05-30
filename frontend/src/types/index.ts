export type Colonia = {
  id: string;
  nombre: string;
  zona: string;
  dias: {
    [dia: string]: boolean; // L, M, X... = true/false
  };
};

export type DiaSemana =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type ColoniaAsignacion = {
  id: string;
  colonia: string;
  zona: string;
  ubicación?: string;
  asignaciones: Record<DiaSemana, string | null>;
  voluntarios_disponibles: Record<DiaSemana, number>;
};
