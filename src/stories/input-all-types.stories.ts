import type { Meta, StoryObj } from '@storybook/react';
import InputMUI from '../shared/ui/Input-mui';

const meta = {
	title: 'Example/InputAllTypes',
	component: InputMUI,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof InputMUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Имя*',
		value: 'Иван Петров',
		isEnabled: true,
	},
};

export const Password: Story = {
	args: {
		label: 'Пароль*',
		value: '12345678',
		isEnabled: true,
		type: 'password',
	},
};

export const Email: Story = {
	args: {
		label: 'Email*',
		value: 'info@yandex.ru',
		isEnabled: true,
	},
};
