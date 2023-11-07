import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#6750A4',
      light: '#E9DDFF',
      dark: '#22005D',
      contrastText: '#fff',
    },
    secondary: {
      main: '#625B71',
      light: '#E8DEF8',
      dark: '#1E192B',
      contrastText: '#fff',
    },
    info: {
      main: '#7E5260',
      light: '#FFD9E3',
      dark: '#31101D',
      contrastText: '#fff',
    },
    error: {
      main: '#BA1A1A',
      light: '#FFDAD6',
      dark: '#410002',
      contrastText: '#fff',
    },
    surface: {
      main: '#7A757F',
      light: '#CAC4CF',
      dark: '#49454E',
      darker: '#1C1B1E',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Nunito', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.25,
      letterSpacing: 0,
      '@media (max-width:600px)': {
        fontSize: '2.125rem',
      },
      '@media (max-width:480px)': {
        fontSize: '2rem',
      },
    },
    button: {
      textTransform: 'none',
    },
  },
});

//Add new color to the palette. Key "surface" is the name of the color added. Add new colors next.
declare module '@mui/material/styles' {
  interface Palette {
    surface: Palette['primary'];
  }

  interface PaletteOptions {
    surface?: PaletteOptions['primary'];
  }
}

//Add the color to the component. If you need to use custom color in any components, they have to be added like this.
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    surface: true;
  }
}

//Add new color token (the variant of the color, like 'main', 'light' and 'dark')
declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}
