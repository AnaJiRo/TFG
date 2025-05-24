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

function CheckboxGroupWrapper(props: any) {
  const [selected, setSelected] = useState<string[]>(['Lunes']);

  const handleChange = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="bg-purple-700 p-4 rounded-lg w-full max-w-md">
      <CheckboxGroup
        {...props}
        selected={selected}
        onChange={handleChange}
      />
    </div>
  );
}

export const Responsive: Story = {
  render: () => (
    <CheckboxGroupWrapper
      options={['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']}
      responsive={true}
    />
  ),
};

export const FixedTwoColumns: Story = {
  render: () => (
    <CheckboxGroupWrapper
      options={['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']}
      columns={2}
    />
  ),
};
