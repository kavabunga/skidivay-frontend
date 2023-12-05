import { FC, ReactNode, useEffect, useState } from 'react';
import {
  UserContext,
  CardContext,
  CardsContext,
  ShopListContext,
  MessagesContext,
  SortedCardsContext,
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
    api
      .getShops()
      .then((res) => {
        setShopsData(res);
      })
      .catch(handleError);
    if (localStorage.getItem('token')) {
      api
        .getUser()
        .then((res) => {
          setUserData(res);
        })
        .catch(handleError);
      api
        .getCards()
        .then((res) => {
          setCardsData(res);
          setSortedCards(res);
        })
        .catch(handleError);
    }
  }, []);

  return (
    <MessagesContext.Provider
      value={{ messages: messagesData, setMessages: setMessagesData }}
    >
      <ShopListContext.Provider
        value={{ shops: shopsData, setShops: setShopsData }}
      >
        <UserContext.Provider value={{ user: userData, setUser: setUserData }}>
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
  );
};
