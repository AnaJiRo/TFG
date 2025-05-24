type CheckboxGroupProps = {
    options: string[];
    selected: string[];
    onChange: (value: string) => void;
  };
  
  export default function CheckboxGroup({ options, selected, onChange }: CheckboxGroupProps) {
    return (
      <div className="grid grid-cols-2 gap-2">
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
  