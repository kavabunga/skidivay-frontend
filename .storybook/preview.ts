import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '../src/shared/lib';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
	kindleFire2: {
		name: 'mobile',
		styles: {
			width: '360px',
			height: '963px',
		},
	},
};

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		parameters: {
			viewport: {
				viewports: { ...INITIAL_VIEWPORTS, ...customViewports },
			},
		},
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
