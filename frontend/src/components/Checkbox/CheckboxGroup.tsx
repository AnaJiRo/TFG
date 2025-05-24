type CheckboxGroupProps = {
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  columns?: number;               // columnas fijas (1, 2, 3...)
  responsive?: boolean;           // usar columnas responsive (1 en móvil, 2 en desktop)
};

export default function CheckboxGroup({
  options,
  selected,
  onChange,
  columns = 1,
  responsive = false,
}: CheckboxGroupProps) {
  const baseClass = 'grid gap-2';

  const columnClass = responsive
    ? 'grid-cols-1 md:grid-cols-2' // 1 columna en móvil, 2 en escritorio
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
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
