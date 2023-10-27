import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '../src/shared/lib';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export const decorators = [
	withThemeFromJSXProvider({
		themes: {
			light: lightTheme,
		},
		defaultTheme: 'light',
		GlobalStyles: CssBaseline,
		Provider: ThemeProvider,
	}),
];

export default preview;
