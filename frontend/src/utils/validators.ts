export type ColoniaData = {
    nombre: string;
    ubicacion: string;
    zona: string;
    dias: string[];
    voluntariosAsignados?: string[];
  };
  
  export function validateColoniaData(data: ColoniaData): string | null {
    if (!data.nombre.trim()) return 'El nombre es obligatorio';
    if (!data.ubicacion.trim()) return 'La ubicación es obligatoria';
    if (!data.zona.trim()) return 'Debes indicar una zona';
    if (data.dias.length === 0) return 'Selecciona al menos un día';
  
    return null; // Todo correcto
  }
  