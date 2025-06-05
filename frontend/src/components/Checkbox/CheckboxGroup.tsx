type CheckboxGroupProps = {
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  direction?: "row" | "column";
  responsive?: boolean; // usar columnas responsive (1 en móvil, 2 en desktop)
};

export default function CheckboxGroup({
  options,
  selected,
  onChange,
  direction = "column",
  responsive = false,
}: CheckboxGroupProps) {
  const layout =
    direction === "row"
      ? "flex flex-wrap gap-4"
      : responsive
      ? "grid grid-cols-2 gap-x-4 gap-y-2"
      : "flex flex-col gap-2";

  return (
    <div className={layout}>
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 text-white text-sm"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="accent-purpleTheme-primary w-4 h-4"
          />
          {option}
        </label>
      ))}
    </div>
  );
}
