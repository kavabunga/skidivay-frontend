import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, Home, NotFound, RootLayout } from '~/pages';
import { lightTheme } from '~/shared/lib';
import 'typeface-roboto';
import 'typeface-nunito';

export function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={RootLayout}>
              <Route index Component={Home} />
            </Route>
            <Route path="auth" Component={AuthLayout} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
