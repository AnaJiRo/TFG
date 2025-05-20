import React from 'react';

type InputProps = {
  label: string;                // Etiqueta visible sobre el input
  placeholder?: string;         // Texto que se muestra dentro del input
  type?: 'text' | 'email' | 'password'; // Tipo de campo
  value?: string;               // Valor controlado del input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Evento de cambio
  error?: string;               // Mensaje de error opcional
};

export default function Input({
  label,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col w-full font-nunito">
      {/* Etiqueta del campo */}
      <label className="mb-1 text-sm font-semibold text-purpleTheme-text">
        {label}
      </label>

      {/* Campo de entrada */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 rounded-lg border text-sm outline-none transition-all
          ${error ? 'border-purpleTheme-error' : 'border-purpleTheme-border'}
          focus:ring-2 focus:ring-purpleTheme-primary`}
      />

      {/* Mensaje de error */}
      {error && (
        <span className="mt-1 text-sm text-purpleTheme-error">{error}</span>
      )}
    </div>
  );
}
