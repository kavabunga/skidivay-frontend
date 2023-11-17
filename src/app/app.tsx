import { Contexts } from '.';
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
import { lightTheme } from '~/shared/lib';
import 'typeface-roboto';
import 'typeface-nunito';
import {
  mockUser,
  mockShopList,
  defaultCards,
  defaultCard,
  chipsLabels,
} from '~/shared/mock/';

// import { getShopList } from '~/shared/api';

function handleLogOut() {
  return;
}

//NOTE: получение списка магазинова пока без useEffect
// getShopList();

export function App() {
  //NOTE: Temporary solution to connect Contexts
  const user = mockUser;
  const cards = defaultCards;
  const card = defaultCard;
  const shops = mockShopList;
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Contexts user={user} cards={cards} card={card} shops={shops}>
          <Routes>
            <Route path="/auth" Component={AuthLayout}>
              <Route index Component={AuthWidget} />
            </Route>
            <Route path="/" Component={RootLayout}>
              <Route index Component={Home} />
              {/*
              //NOTE: Main screen logic yet not active
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
            /> */}
              <Route path="authorizedNoCards" element={<Welcome />} />
              <Route
                path="authorizedWithCards"
                element={<UserCards tags={chipsLabels} logOut={handleLogOut} />}
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
        </Contexts>
      </BrowserRouter>
    </ThemeProvider>
  );
}
