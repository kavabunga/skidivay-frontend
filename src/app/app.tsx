import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, Home, NotFound, RootLayout } from '~/pages';
import { SignInWidget, SignUpWidget } from '~/widgets';
import { lightTheme } from '~/shared/lib';
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
            <Route path="auth" Component={AuthLayout}>
              <Route index Component={SignInWidget} />
              <Route path="signup" Component={SignUpWidget} />
            </Route>
            <Route path="*" Component={NotFound} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
