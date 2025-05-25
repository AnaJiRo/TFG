type RadioGroupProps = {
    name: string;                  // nombre común del grupo
    options: string[];            // lista de opciones
    selected: string;             // valor actualmente seleccionado
    onChange: (value: string) => void;
    columns?: number;             // columnas fijas opcionales
    responsive?: boolean;         // si usar 1 columna en móvil, 2+ en escritorio
  };
  
  export default function RadioGroup({
    name,
    options,
    selected,
    onChange,
    columns = 1,
    responsive = false,
  }: RadioGroupProps) {
    const baseClass = 'grid gap-2';
  
    const columnClass = responsive
      ? 'grid-cols-1 md:grid-cols-2'
      : {
          1: 'grid-cols-1',
          2: 'grid-cols-2',
          3: 'grid-cols-3',
          4: 'grid-cols-4',
        }[columns] || 'grid-cols-1';
  
    return (
      <div className={`${baseClass} ${columnClass}`}>
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-white">
            <input
              type="radio"
              name={name}
              value={option}
              checked={selected === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }
  