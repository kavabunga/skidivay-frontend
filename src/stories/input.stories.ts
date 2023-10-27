import type { Meta, StoryObj } from '@storybook/react';
import InputMUI from '../shared/ui/Input-mui';

const meta = {
	title: 'Example/Input',
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
		value: 'Value',
		isEnabled: true,
	},
};

export const Disable: Story = {
	args: {
		value: 'Value',
		isEnabled: false,
	},
};

export const Error: Story = {
	args: {
		value: 'Value',
		isEnabled: true,
		error: true,
	},
};
