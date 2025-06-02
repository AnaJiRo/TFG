export const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];

export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type DayKey = (typeof days)[number];

export const dayShortNames: Record<DayKey, string> = {
  monday: "L", // Lunes
  tuesday: "M", // Martes
  wednesday: "X", // Miércoles
  thursday: "J", // Jueves
  friday: "V", // Viernes
  saturday: "S", // Sábado
  sunday: "D", // Domingo
};
