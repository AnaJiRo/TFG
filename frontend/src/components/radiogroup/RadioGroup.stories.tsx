import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup from './RadioGroup';
import { useState } from 'react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

function RadioGroupWrapper(props: any) {
  const [selected, setSelected] = useState('Norte');

  return (
    <div className="bg-purple-700 p-4 rounded-lg w-full max-w-md">
      <RadioGroup
        {...props}
        selected={selected}
        onChange={(value) => setSelected(value)}
      />
    </div>
  );
}

export const Responsive: Story = {
  render: () => (
    <RadioGroupWrapper
      name="zonas"
      options={['Norte', 'Centro', 'Sur', 'Este']}
      responsive={true}
    />
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <RadioGroupWrapper
      name="zonas"
      options={['Norte', 'Centro', 'Sur', 'Este']}
      columns={2}
    />
  ),
};
