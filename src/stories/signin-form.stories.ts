import type { Meta, StoryObj } from '@storybook/react';
import SignInForm from '~/features/auth/sign-in';

const meta = {
	title: 'Example/Sign In form',
	component: SignInForm,
	parameters: {
		layout: 'centered',
		width: '320px',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
