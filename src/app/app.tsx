import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, NotFound, RootLayout } from '~/pages';
import {
  Home,
  AuthWidget,
  CardWidget,
  AddCardWidget,
  Welcome,
  UserCards,
} from '~/widgets';
import { defaultCards } from '~/shared/mock/default-cards';
import { chipsLabels } from '~/shared/mock/chips-labels';
import { lightTheme } from '~/shared/lib';
import 'typeface-roboto';
import 'typeface-nunito';

function handleLogOut() {
  console.log('user logged out');
}

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
            <Route
              path="authorizedNoCards"
              element={<Welcome user={{ name: 'Василий' }} />}
            />
            <Route
              path="authorizedWithCards"
              element={
                <UserCards
                  cards={defaultCards}
                  tags={chipsLabels}
                  logOut={handleLogOut}
                />
              }
            />
            <Route path="card">
              <Route path="new" Component={AddCardWidget} />
              <Route path=":id" Component={CardWidget} />
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
