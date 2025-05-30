type FormContainerProps = {
  children: React.ReactNode;
  maxWidth?: string;         // Clase Tailwind para el ancho máximo
  className?: string;        // Para añadir más estilos personalizados
};

export default function FormContainer({
  children,
  maxWidth = 'max-w-md',     // Tu valor defecto
  className = '',            // Por si se quiere extender
}: FormContainerProps) {
  return (
    <div
      className={`w-full ${maxWidth} bg-fuchsia-300/80 backdrop-blur-md px-10 py-6 rounded-2xl shadow-lg flex flex-col gap-6 ${className}`}
    >
      {children}
    </div>
  );
}
