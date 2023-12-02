import { ICardsContext } from '~/shared';

export const sortCards = (cards: ICardsContext): ICardsContext => {
  return cards.slice().sort((a, b) => {
    const dateA = new Date(a.card.pub_date);
    const dateB = new Date(b.card.pub_date);
    if (a.favourite > b.favourite) {
      return -1;
    }
    if (a.favourite < b.favourite) {
      return 1;
    }
    return Number(dateA) - Number(dateB);
  });
};
