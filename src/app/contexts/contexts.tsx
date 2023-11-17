import { FC, ReactNode } from 'react';
import { UserContext, CardContext, CardsContext, ShopListContext } from '.';
import {
  ICardContext,
  ICardsContext,
  IShopListContext,
  IUserContext,
} from '~/shared';

interface IContexts {
  user: IUserContext;
  cards: ICardsContext;
  card: ICardContext;
  shops: IShopListContext;
  children: ReactNode;
}

export const Contexts: FC<IContexts> = ({
  user,
  cards,
  card,
  shops,
  children,
}) => {
  return (
    <ShopListContext.Provider value={shops}>
      <UserContext.Provider value={user}>
        <CardsContext.Provider value={cards}>
          <CardContext.Provider value={card}>{children}</CardContext.Provider>
        </CardsContext.Provider>
      </UserContext.Provider>
    </ShopListContext.Provider>
  );
};
