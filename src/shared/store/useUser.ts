import { IMask } from 'react-imask';
import { create } from 'zustand';
import { ICard, ICardContext, ICardsContext, IUserContext } from '~/shared';

interface IuseUser {
  user: IUserContext | null;
  cards: ICardsContext | [];
  sortedCards: ICardsContext | [];
  setUser: (data: IUserContext | null) => void;
  setCards: (data: ICardsContext | []) => void;
  addCard: (data: ICardContext) => void;
  editCard: (data: ICard) => void;
  deleteCard: (id: number) => void;
  likeCard: (data: ICardContext, id: number) => void;
  setSortedCards: (data: ICardsContext) => void;
  filterCards: (labels: string[]) => void;
  searchCards: (input: string) => void;
  clearUser: () => void;
  clearCards: () => void;
  clearSortedCards: () => void;
}

export const useUser = create<IuseUser>()((set) => ({
  user: null,
  cards: [],
  sortedCards: [],
  setUser: (user) =>
    set(() => {
      if (user?.phone_number) {
        const masked = IMask.createMask({
          mask: '+7 (000) 000-00-00',
        });
        masked.resolve(user?.phone_number);
        user.phone_number = masked.value;
      }
      return { user: user };
    }),
  setCards: (cards) => set(() => ({ cards: cards })),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  editCard: (data) =>
    set((state) => {
      const newCards = state.cards.map((card) =>
        card.card.id != data.id ? card : { ...card, card: data }
      );
      return { cards: newCards };
    }),
  deleteCard: (id) =>
    set((state) => {
      const newCards = state.cards.filter((card) => card.card.id != id);
      return { cards: newCards };
    }),
  likeCard: (data, id) =>
    set((state) => {
      const newCards = state.cards.map((card) =>
        card.card.id === id ? data : card
      );
      return { cards: newCards };
    }),
  setSortedCards: (data) => set(() => ({ sortedCards: data })),
  filterCards: (labels) =>
    set((state) => {
      const arr: ICardsContext = [];
      if (labels.length) {
        labels.forEach((label) => {
          const matchedCards = state.cards.filter((card) => {
            let isReturn = false;
            card.card.shop.group?.forEach((el) => {
              if (el.name === label) {
                isReturn = true;
              }
            });
            if (labels.includes('Избранное')) {
              if (!card.favourite) isReturn = false;
            }
            if (isReturn) return card;
          });
          matchedCards.forEach((card) => {
            arr.push(card);
          });
        });
        if (
          !arr.length &&
          labels.includes('Избранное') &&
          labels.length === 1
        ) {
          const arr1 = state.cards.filter((card) => card.favourite);
          return { sortedCards: arr1 };
        }
        return { sortedCards: arr };
      } else {
        return { sortedCards: state.cards };
      }
    }),
  searchCards: (input) =>
    set((state) => {
      const newCards = state.cards.filter(
        (card) =>
          card.card.shop?.name
            .toLowerCase()
            .startsWith(input.toLowerCase().trim())
      );

      if (newCards.length) {
        return { sortedCards: newCards };
      } else {
        return { sortedCards: [] };
      }
    }),
  clearUser: () => set(() => ({ user: null })),
  clearCards: () => set(() => ({ cards: [], sortedCards: [] })),
  clearSortedCards: () => set(() => ({ sortedCards: [] })),
}));
