import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#475467',
		},
		error: {
			main: '#F04438',
		},
	},
	typography: {
		fontFamily: 'Nunito, Arial, sans-serif',
	},
});
