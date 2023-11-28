import { FC, useContext, MouseEvent } from 'react';
import { CardsContext } from '~/app/contexts';
import { ICardContext } from '~/shared/types';
import { api } from '~/shared';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { iconButtonStyle } from './style';

interface LikerProps {
  cardId: number;
  isLiked: boolean;
}

export const Liker: FC<LikerProps> = ({ cardId, isLiked }) => {
  const { cards, setCards } = useContext(CardsContext);

  async function handleClick(e: MouseEvent) {
    //NOTE: Cancelling event bubbling to prevent firing card click
    e.stopPropagation();
    if (cards && setCards) {
      let newCard: ICardContext;
      try {
        newCard = await api.changeCardLikeStatus(cardId, !isLiked);
      } catch (e) {
        console.log(e);
      }
      const newCards = cards.map((item) =>
        item.card.id === cardId ? newCard : item
      );
      setCards(newCards);
    }
  }

  return (
    <IconButton
      size="small"
      sx={{ ...iconButtonStyle }}
      onClick={(e) => handleClick(e)}
    >
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
