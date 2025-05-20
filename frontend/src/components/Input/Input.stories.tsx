import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Introduce tu nombre',
    type: 'text',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'ejemplo@correo.com',
    type: 'email',
    error: 'Este campo es obligatorio',
  },
};

export const Password: Story = {
  args: {
    label: 'Contraseña',
    placeholder: '********',
    type: 'password',
  },
};
