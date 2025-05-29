type SelectBoxProps = {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder?: string;
  };
  
  export default function SelectBox({
    label,
    value,
    options,
    onChange,
    placeholder = 'Selecciona una opción',
  }: SelectBoxProps) {
    return (
      <div className="flex flex-col w-full font-nunito">
        <label className="mb-1 text-sm font-semibold text-purpleTheme-text">{label}</label>
  
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`px-4 py-2 rounded-lg border text-sm outline-none transition-all bg-fuchsia-300 text-black
            ${value ? 'border-purpleTheme-primary' : 'border-purpleTheme-border'}
            focus:ring-2 focus:ring-purpleTheme-primary`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
  