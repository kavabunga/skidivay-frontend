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
      light: '#F3EDF7',
      lighter: '#FDF8FD',
      dark: '#49454E',
      darker: '#1C1B1E',
      inverse: '#313033',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.125rem',
      fontWeight: 400,
      lineHeight: 1,
      color: 'surface.darker',
      textAlign: 'left',
      '@media (max-width:760px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: 0,
      color: 'surface.darker',
      textAlign: 'left',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        body {
          background-color:  #e2dce5;
          overflow-wrap: break-word;
          overscroll-behavior: none;
        }
        #root {
          display: flex;
          width: 100%;
          min-width: 320px;
          max-width: 760px;
          margin: 0 auto;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: flex-start;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          box-sizing: border-box;
          background-color: ${themeParam.palette.surface.lighter};
        }
      `,
    },
  },
});

//NOTE: Add new color to the palette. Key "surface" is the name of the color added. Add new colors next.
declare module '@mui/material/styles' {
  interface Palette {
    surface: Palette['primary'];
  }

  interface PaletteOptions {
    surface?: PaletteOptions['primary'];
  }
}

//NOTE: Add the color to the component. If you need to use custom color in any components, they have to be added like this.
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    surface: true;
  }
}

//NOTE: Add new color token (the variant of the color, like 'main', 'light' and 'dark')
declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
    inverse?: string;
    lighter?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
    inverse?: string;
    lighter?: string;
  }
}
