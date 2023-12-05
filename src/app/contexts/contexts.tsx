import { FC, ReactNode, useEffect, useState } from 'react';
import {
  UserContext,
  CardContext,
  CardsContext,
  ShopListContext,
  MessagesContext,
  SortedCardsContext,
  LoadingContext,
} from '.';
import {
  ICardContext,
  ICardsContext,
  IShopListContext,
  IUserContext,
  IMessageContext,
  api,
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
  const [cardData, setCardData] = useState<ICardContext>(Object);
  const [sortedCards, setSortedCards] = useState<ICardsContext>([]);
  const [messagesData, setMessagesData] = useState<IMessageContext[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  useEffect(() => {
    const handleError = (err: IApiError) => {
      setMessagesData((messagesData) => [
        {
          message: err.message,
          type: ApiMessageTypes.error,
        },
        ...messagesData,
      ]);
    };
    api
      .getShops()
      .then((res) => {
        setShopsData(res);
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
        <ShopListContext.Provider
          value={{ shops: shopsData, setShops: setShopsData }}
        >
          <UserContext.Provider
            value={{ user: userData, setUser: setUserData }}
          >
            <CardsContext.Provider
              value={{ cards: cardsData, setCards: setCardsData }}
            >
              <CardContext.Provider
                value={{ card: cardData, setCard: setCardData }}
              >
                <SortedCardsContext.Provider
                  value={{ cards: sortedCards, setSortedCards: setSortedCards }}
                >
                  {children}
                </SortedCardsContext.Provider>
              </CardContext.Provider>
            </CardsContext.Provider>
          </UserContext.Provider>
        </ShopListContext.Provider>
      </MessagesContext.Provider>
    </LoadingContext.Provider>
  );
};
