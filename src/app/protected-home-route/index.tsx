import { useContext } from 'react';
import { CardsContext, UserContext } from '..';
import { Home, UserCards, Welcome } from '~/widgets';
import { chipsLabels } from '~/shared';

export const ProtectedHomeRoute = () => {
  const { user } = useContext(UserContext);
  const { cards } = useContext(CardsContext);

  if (!user) {
    return <Home />;
  } else if (cards) {
    return <UserCards tags={chipsLabels} />;
  } else {
    return <Welcome />;
  }
};
