import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, NotFound, RootLayout } from '~/pages';
import { Home, AuthWidget, CardWidget, AddCardWidget } from '~/widgets';
import { lightTheme } from '~/shared/lib';
import 'typeface-roboto';
import 'typeface-nunito';

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" Component={AuthLayout}>
            <Route index Component={AuthWidget} />
          </Route>
          <Route path="/" Component={RootLayout}>
            <Route index Component={Home} />
            <Route path="card">
              <Route path="new" Component={AddCardWidget} />
              <Route
                path=":id"
                element={
                  <CardWidget
                    cardNumber="1111 1383 0039 3838 49994"
                    barcodeNumber="113839895849854"
                  />
                }
              />
            </Route>
          </Route>
          <Route path="*" Component={RootLayout}>
            <Route index Component={NotFound} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
