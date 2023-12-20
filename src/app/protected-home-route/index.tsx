import { useShallow } from 'zustand/react/shallow';
import { Preloader } from '~/shared';
import { useLoading } from '~/shared/store';
import { useUser } from '~/shared/store/useUser';
import { Home, UserCards, Welcome } from '~/widgets';

export const ProtectedHomeRoute = () => {
  const user = useUser((state) => state.user);
  const cards = useUser(useShallow((state) => state.cards));
  const isLoading = useLoading((state) => state.isLoading);

  if (isLoading) {
    return <Preloader />;
  } else if (!user) {
    return <Home />;
  } else if (cards?.[0]) {
    return <UserCards />;
  } else {
    return <Welcome />;
  }
};
