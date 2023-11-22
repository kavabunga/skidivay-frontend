import { FC, ReactNode, useEffect, useState } from 'react';
import { UserContext, CardContext, CardsContext, ShopListContext } from '.';
import {
  ICardContext,
  ICardsContext,
  IShopListContext,
  IUserContext,
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
        .catch((err) => console.log(err.message));
      api
        .getCards()
        .then((res) => {
          setCardsData(res);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  return (
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
            {children}
          </CardContext.Provider>
        </CardsContext.Provider>
      </UserContext.Provider>
    </ShopListContext.Provider>
  );
};
