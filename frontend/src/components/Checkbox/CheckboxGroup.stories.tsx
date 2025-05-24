import type { Meta, StoryObj } from '@storybook/react';
import CheckboxGroup from './CheckboxGroup';
import { useState } from 'react';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

// Componente wrapper para manejar el estado de selección en Storybook
function CheckboxGroupWrapper() {
  const [selected, setSelected] = useState<string[]>(['Lunes']);

  const handleChange = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="bg-purple-700 p-4 rounded-lg w-64">
      <CheckboxGroup
        options={['Lunes', 'Martes', 'Miércoles', 'Jueves']}
        selected={selected}
        onChange={handleChange}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <CheckboxGroupWrapper />,
};
