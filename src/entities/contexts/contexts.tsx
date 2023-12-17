import { FC, ReactNode, useEffect } from 'react';
import { api } from '~/shared';
import { IApiError } from '~/shared/errors';
import { useLoading, useMessages, useShops, useUser } from '~/shared/store';

interface IContexts {
  children: ReactNode;
}

export const Contexts: FC<IContexts> = ({ children }) => {
  const loaded = useLoading((state) => state.loaded);
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const setGroups = useShops((state) => state.setGroups);
  const setShops = useShops((state) => state.setShops);
  const setUser = useUser((state) => state.setUser);
  const setCards = useUser((state) => state.setCards);
  const setSortedCards = useUser((state) => state.setSortedCards);

  useEffect(() => {
    const handleError = (err: IApiError) => {
      addErrorMessage(
        err.detail?.non_field_errors?.join(' ') ||
          err.message ||
          'Ошибка сервера'
      );
    };
    const shopsPromise = api.getShops();
    const groupsPromise = api.getGroups();
    Promise.all([shopsPromise, groupsPromise])
      .then((res) => {
        setShops(res[0]);
        setGroups(res[1]);
      })
      .then(() => {
        if (localStorage.getItem('token')) {
          const userPromise = api.getUser();
          const cardsPromise = api.getCards();
          return Promise.all([userPromise, cardsPromise]).then((res) => {
            setUser(res[0]);
            setCards(res[1]);
            setSortedCards(res[1]);
          });
        }
        return;
      })
      .catch(handleError)
      .finally(() => loaded());
    //NOTE: Here we run initial loading of app data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
