// src/components/Button/Button.tsx

import React from 'react';

// Definimos los props que acepta el botón
type ButtonProps = {
  label: string;               // Texto que se muestra dentro del botón
  onClick?: () => void;        // Función que se ejecuta al hacer clic
  variant?: 'primary' | 'secondary' | 'error'; // Tipos de estilos disponibles
};

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  // Estilos condicionales según el tipo de botón
  const baseStyles = 'px-4 py-2 rounded-lg font-poppins transition-colors duration-300';
  const variants = {
    primary: 'bg-purpleTheme-primary text-white hover:bg-purpleTheme-dark',
    secondary: 'bg-purple-400 text-white border border-purpleTheme-primary hover:bg-purpleTheme-background',
    error: 'bg-purpleTheme-error text-white hover:opacity-90',
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {label}
    </button>
  );
}
