import { Contexts, ProtectedHomeRoute, ProtectedRoute } from '.';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, NotFound, RootLayout } from '~/pages';
import {
  AuthWidget,
  CardWidget,
  AddCardWidget,
  // Welcome,
  // UserCards,
} from '~/widgets';
import { lightTheme } from '~/shared/lib';
import 'typeface-roboto';
import 'typeface-nunito';
// import { chipsLabels } from '~/shared/mock/';

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Contexts>
          <Routes>
            <Route path="/auth" Component={AuthLayout}>
              <Route index Component={AuthWidget} />
            </Route>
            <Route path="/" Component={RootLayout}>
              <Route index element={<ProtectedHomeRoute />} />
              <Route element={<ProtectedRoute />}>
                {/* //NOTE: Temporary demo routes from here */}
                {/* <Route path="authorizedNoCards" element={<Welcome />} />
                <Route
                  path="authorizedWithCards"
                  element={<UserCards tags={chipsLabels} />}
                /> */}
                {/* //NOTE: Temporary demo routes to here */}
                <Route path="card">
                  <Route path="new" Component={AddCardWidget} />
                  <Route path=":id" Component={CardWidget} />
                </Route>
              </Route>
            </Route>
            <Route path="*" Component={RootLayout}>
              <Route index Component={NotFound} />
            </Route>
          </Routes>
        </Contexts>
      </BrowserRouter>
    </ThemeProvider>
  );
}
