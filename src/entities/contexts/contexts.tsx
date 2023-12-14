import { FC, ReactNode, useEffect, useState } from 'react';
import {
  UserContext,
  CardsContext,
  ShopListContext,
  MessagesContext,
  SortedCardsContext,
  LoadingContext,
  GroupListContext,
} from '.';
import {
  ICardsContext,
  IShopListContext,
  IUserContext,
  IMessageContext,
  api,
  IGroupListContext,
} from '~/shared';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';

interface IContexts {
  children: ReactNode;
}

export const Contexts: FC<IContexts> = ({ children }) => {
  const [userData, setUserData] = useState<IUserContext | null>(null);
  const [shopsData, setShopsData] = useState<IShopListContext>([]);
  const [cardsData, setCardsData] = useState<ICardsContext>([]);
  const [sortedCards, setSortedCards] = useState<ICardsContext>([]);
  const [messagesData, setMessagesData] = useState<IMessageContext[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [groupsData, setGroupsData] = useState<IGroupListContext>([]);

  useEffect(() => {
    const handleError = (err: IApiError) => {
      setMessagesData((messagesData) => [
        {
          message: err.detail?.non_field_errors?.join(' ') || err.message,
          type: ApiMessageTypes.error,
        },
        ...messagesData,
      ]);
    };
    const shopsPromise = api.getShops();
    const groupsPromise = api.getGroups();
    Promise.all([shopsPromise, groupsPromise])
      .then((res) => {
        setShopsData(res[0]);
        setGroupsData(res[1]);
      })
      .then(() => {
        if (localStorage.getItem('token')) {
          const userPromise = api.getUser();
          const cardsPromise = api.getCards();
          return Promise.all([userPromise, cardsPromise]).then((res) => {
            setUserData(res[0]);
            setCardsData(res[1]);
            setSortedCards(res[1]);
          });
        }
        return;
      })
      .catch(handleError)
      .finally(() => setIsLoadingData(false));
  }, []);

  return (
    <LoadingContext.Provider
      value={{ isLoading: isLoadingData, setIsLoading: setIsLoadingData }}
    >
      <MessagesContext.Provider
        value={{ messages: messagesData, setMessages: setMessagesData }}
      >
        <GroupListContext.Provider
          value={{ groups: groupsData, setGroups: setGroupsData }}
        >
          <ShopListContext.Provider
            value={{ shops: shopsData, setShops: setShopsData }}
          >
            <UserContext.Provider
              value={{ user: userData, setUser: setUserData }}
            >
              <CardsContext.Provider
                value={{ cards: cardsData, setCards: setCardsData }}
              >
                <SortedCardsContext.Provider
                  value={{
                    cards: sortedCards,
                    setSortedCards: setSortedCards,
                  }}
                >
                  {children}
                </SortedCardsContext.Provider>
              </CardsContext.Provider>
            </UserContext.Provider>
          </ShopListContext.Provider>
        </GroupListContext.Provider>
      </MessagesContext.Provider>
    </LoadingContext.Provider>
  );
};
