interface SelectInputBoxProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectInputBox({
  label,
  value,
  options,
  onChange,
  placeholder = "Escribe o selecciona una opción",
}: SelectInputBoxProps) {
  const datalistId = `datalist-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex flex-col w-full font-nunito">
      <label className="mb-1 text-sm font-semibold text-white">
        {label}
      </label>

      <input
        type="text"
        list={datalistId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-4 py-2 rounded-lg border text-sm outline-none transition-all bg-fuchsia-300 text-purpleTheme-primary
          ${value ? "border-purpleTheme-primary" : "border-purpleTheme-border"}
          focus:ring-2 focus:ring-purpleTheme-primary`}
      />
      <datalist id={datalistId}>
        {options.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </div>
  );
}
