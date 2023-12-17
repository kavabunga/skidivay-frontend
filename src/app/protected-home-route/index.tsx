import { useShallow } from 'zustand/react/shallow';
import { useUser } from '~/shared/store/useUser';
import { Home, UserCards, Welcome } from '~/widgets';

export const ProtectedHomeRoute = () => {
  const user = useUser((state) => state.user);
  const cards = useUser(useShallow((state) => state.cards));

  if (!user) {
    return <Home />;
  } else if (cards) {
    return <UserCards />;
  } else {
    return <Welcome />;
  }
};
