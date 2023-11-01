import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '~/app';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '~/shared/lib';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
