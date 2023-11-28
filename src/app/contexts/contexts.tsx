import { FC, ReactNode, useEffect, useState } from 'react';
import {
  UserContext,
  CardContext,
  CardsContext,
  ShopListContext,
  MessageContext,
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

interface IContexts {
  children: ReactNode;
}

export const Contexts: FC<IContexts> = ({ children }) => {
  const [userData, setUserData] = useState<IUserContext | null>(null);
  const [shopsData, setShopsData] = useState<IShopListContext>([]);
  const [cardsData, setCardsData] = useState<ICardsContext>([]);
  const [cardData, setCardData] = useState<ICardContext>(Object);
  const [messageData, setMessageData] = useState<IMessageContext>(Object);
  const [sortedCards, setSortedCards] = useState<ICardsContext>([]);

  useEffect(() => {
    api
      .getShops()
      .then((res) => {
        setShopsData(res);
      })
      .catch((err) => console.log(err.message));
    if (localStorage.getItem('token')) {
      api
        .getUser()
        .then((res) => {
          setUserData(res);
        })
        .catch((err) => {
          err.message.includes('401') && localStorage.removeItem('token');
          console.log(err.message);
        });
      api
        .getCards()
        .then((res) => {
          setCardsData(res);
          setSortedCards(res);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  return (
    <MessageContext.Provider
      value={{ message: messageData, setMessage: setMessageData }}
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
    </MessageContext.Provider>
  );
};
