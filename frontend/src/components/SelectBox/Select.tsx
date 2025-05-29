
type Option = {
    label: string;
    value: string;
  };
  
  type SelectProps = {
    label?: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
  };
  
  export default function Select({
    label,
    options,
    value,
    onChange,
    placeholder = 'Selecciona una opción',
    disabled = false,
  }: SelectProps) {
    return (
      <div className="flex flex-col w-full font-nunito">
        {label && (
          <label className="text-base font-semibold text-white mb-1">
            {label}
          </label>
        )}
  
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="px-4 py-2 rounded-lg border text-sm outline-none transition-all bg-white/10 text-purple-500
           border-purpleTheme-border focus:ring-2 focus:ring-purpleTheme-primary"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  