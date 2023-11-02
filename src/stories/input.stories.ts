import type { Meta, StoryObj } from '@storybook/react';
import InputMUI from '../shared/ui/input-mui';

const meta = {
	title: 'Example/Input',
	component: InputMUI,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: {
			options: ['Email', 'Пароль', 'Имя', 'Телефон'],
			control: { type: 'radio' },
		},
		required: {
			control: { type: 'boolean' },
		},
		variant: {
			options: ['outlined', 'filled', 'standard'],
			control: { type: 'radio' },
		},
		helperText: {
			control: { type: 'text' },
			default: '',
		},
		type: {
			options: ['password', 'number', 'search', 'text'],
			control: { type: 'radio' },
		},
		defaultValue: {
			control: { type: 'text' },
		},
		error: {
			control: { type: 'boolean' },
		},
	},
} satisfies Meta<typeof InputMUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
export const Password: Story = {
	args: {
		label: 'Пароль',
		required: true,
		variant: 'outlined',
		type: 'password',
	},
};
export const PasswordError: Story = {
	args: {
		label: 'Пароль',
		required: true,
		variant: 'outlined',
		type: 'password',
		error: true,
		helperText: 'Неверно введен пароль',
	},
};
export const Name: Story = {
	args: {
		label: 'Имя',
		required: true,
		variant: 'outlined',
		type: 'text',
		helperText: 'Как к вам обращаться?',
	},
};
export const Email: Story = {
	args: {
		label: 'Email',
		required: true,
		variant: 'outlined',
		type: 'text',
	},
};
export const EmailError: Story = {
	args: {
		label: 'Email',
		required: true,
		variant: 'outlined',
		type: 'text',
		error: true,
		helperText: 'Такого пользователя не существует',
	},
};
