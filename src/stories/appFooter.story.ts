import { Meta, StoryObj } from '@storybook/react';
import { AppFooter } from '~/shared/ui/app-footer';

export default {};
const meta = {
	title: 'UI/AppFooter',
	component: AppFooter,
	parameters: {
		layout: 'centred',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AppFooter>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
