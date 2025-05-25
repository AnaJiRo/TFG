export type Colonia = {
    id: string;
    nombre: string;
    zona: string;
    dias: {
      [dia: string]: boolean; // L, M, X... = true/false
    };
  };
  