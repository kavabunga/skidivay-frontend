import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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

const isLoggedIn: boolean = true;
const isUserCards: boolean = true;

function handleLogOut() {
  return;
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
            <Route
              index
              element={
                !isLoggedIn ? (
                  <Home />
                ) : isUserCards ? (
                  <Navigate to="authorizedWithCards" replace />
                ) : (
                  <Navigate to="authorizedNoCards" replace />
                )
              }
            />
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
