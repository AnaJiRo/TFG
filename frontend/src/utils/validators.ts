export type ColoniaData = {
  nombre: string;
  ubicacion: string;
  zona: string;
  asignacionPorDia?: Record<string, string | null>;
};

export function validateColoniaData(data: ColoniaData): string | null {
  if (!data.nombre.trim()) return "El nombre es obligatorio";
  if (!data.ubicacion.trim()) return "La ubicación es obligatoria";
  if (!data.zona.trim()) return "Debes indicar una zona";

  if (data.asignacionPorDia) {
    const hayAsignacion = Object.values(data.asignacionPorDia).some(
      (v) => v !== null
    );
    if (!hayAsignacion) return "Asigna al menos un voluntario para algún día";
  }

  return null; // Todo correcto
}
