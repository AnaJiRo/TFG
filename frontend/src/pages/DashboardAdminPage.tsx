import ResumenCard from '../components/Dashboard/ResumenCard';
import ColoniaAlertCard from '../components/Dashboard/ColoniaAlertCard';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer'; // Para contenedores visuales opcionales
import { useEffect, useState } from 'react';
import VoluntarioTag from '../components/VoluntarioTag';
import DisponibilidadBox from '../components/DisponibilidadBox';

// simulacion de datos
import {
    dummyColoniasSinCubrir,
    dummyDisponibilidadAdmin,
    dummyEstadisticas,
    dummyVoluntariosHoy,
  } from '../mocks/mockData';
  
  export default function DashboardAdminPage() {
    return (
      <div className="min-h-screen bg-purple-400 text-white p-6 font-nunito space-y-8">
        {/* Resumen general */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResumenCard icon="🐱" label="Colonias" value={dummyEstadisticas.totalColonias} />
          <ResumenCard icon="👥" label="Voluntarios" value={dummyEstadisticas.totalVoluntarios} />
          <ResumenCard icon="❗" label="Días sin cubrir" value={dummyEstadisticas.diasSinCubrir} />
        </div>
  
        {/* Colonias sin cubrir */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">📍 Colonias sin cubrir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyColoniasSinCubrir.map((colonia, index) => (
              <ColoniaAlertCard key={index} {...colonia} />
            ))}
          </div>
        </section>
  
        {/* Voluntarios activos hoy */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">👥 Voluntarios activos hoy</h2>
          <div className="flex flex-wrap gap-3">
            {dummyVoluntariosHoy.map((voluntario, index) => (
              <VoluntarioTag key={index} {...voluntario} />
            ))}
          </div>
        </section>
  
        {/* Disponibilidad admin */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">⚙️ Tu disponibilidad</h2>
          <DisponibilidadBox {...dummyDisponibilidadAdmin} />
        </section>
      </div>
    );
  }