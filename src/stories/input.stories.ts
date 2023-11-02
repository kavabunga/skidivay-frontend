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
	},
} satisfies Meta<typeof InputMUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
export const Password: Story = {
	args: {
		label: 'password',
		required: true,
		variant: 'outlined',
		type: 'password',
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
