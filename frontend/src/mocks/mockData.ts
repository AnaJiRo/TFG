import { diasSemana } from '../utils/constants';

export const dummyColonias = [
  {
    id: '1',
    nombre: 'Colonia Eleven',
    ubicacion: 'Calle Mayor, Parque de la Paz',
    zona: 'La Nana',
    asignacionPorDia: {
      L: 'Laura P.',
      M: null,
      X: 'Laura P.',
      J: null,
      V: null,
      S: null,
      D: 'Eva M.',
    },
  },
  {
    id: '2',
    nombre: 'Colonia Horcajo',
    ubicacion: 'Calle Betis',
    zona: 'El Horcajo',
    asignacionPorDia: {
      L: 'Pedro R.',
      M: null,
      X: 'Pedro R.',
      J: null,
      V: 'Miguel S.',
      S: null,
      D: 'Sara M.',
    },
  },
  // ...más colonias
];

export const dummyVoluntarios: Record<string, { nombre: string; dias: string[] }[]> = {
  'La Nana': [
    { nombre: 'Laura P.', dias: ['L', 'X'] },
    { nombre: 'Eva M.', dias: ['D'] },
  ],
  'Centro': [
    { nombre: 'Antonio G.', dias: ['L', 'M', 'X', 'J'] },
    { nombre: 'Pedro A.', dias: ['V', 'S', 'D'] },
  ],
  'El Horcajo': [
    { nombre: 'Pedro R.', dias: ['L', 'X'] },
    { nombre: 'Miguel S.', dias: ['V'] },
    { nombre: 'Sara M.', dias: ['D'] },
  ],
  // ...otras zonas
};

export const dummyEstadisticas = {
  totalColonias: 8,
  totalVoluntarios: 12,
  diasSinCubrir: 5,
};

export const dummyColoniasSinCubrir = [
    {
      nombre: 'Triana',
      zona: 'Centro',
      diasFaltantes: ['M'],
    },
    {
      nombre: 'Santa Cruz',
      zona: 'Este',
      diasFaltantes: ['D'],
    },
    {
      nombre: 'Los Ratones',
      zona: 'Norte',
      diasFaltantes: diasSemana,
    },
  ];
  
  export const dummyVoluntariosHoy = [
    { nombre: 'Laura S.', zona: 'Centro', estado: 'activo' },
    { nombre: 'Carmen P.', zona: 'Norte', estado: 'activo' },
    { nombre: 'Hugo', zona: 'Oeste', estado: 'baja' },
    { nombre: 'Admin', zona: 'Todas', estado: 'admin' },
  ];
  
  export const dummyDisponibilidadAdmin = {
    dias: ['L', 'X'],
    zona: 'Centro',
  };