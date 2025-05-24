import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Agrupación en Storybook
  component: Button,
  tags: ['autodocs'],         // Ayuda a Storybook a generar documentación
};

export default meta;

type Story = StoryObj<typeof Button>;

// Ejemplos de historias para probar en Storybook
export const Primary: Story = {
  args: {
    label: 'Aceptar',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Cancelar',
    variant: 'secondary',
  },
};

export const Error: Story = {
  args: {
    label: 'Eliminar',
    variant: 'error',
  },
};
