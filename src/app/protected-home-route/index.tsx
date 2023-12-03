import { useContext } from 'react';
import { CardsContext, UserContext } from '..';
import { Home, UserCards, Welcome } from '~/widgets';

export const ProtectedHomeRoute = () => {
  const { user } = useContext(UserContext);
  const { cards } = useContext(CardsContext);

  if (!user) {
    return <Home />;
  } else if (cards[0]) {
    return <UserCards />;
  } else {
    return <Welcome />;
  }
};
