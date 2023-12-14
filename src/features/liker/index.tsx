import { FC, useContext, MouseEvent } from 'react';
import { CardsContext, MessagesContext } from '~/app/contexts';
import { api } from '~/shared';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { iconButtonLightStyle, iconButtonDarkStyle } from './style';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';

interface LikerProps {
  cardId: number;
  isLiked: boolean;
  isDark: boolean;
}

export const Liker: FC<LikerProps> = ({ cardId, isLiked, isDark }) => {
  const { cards, setCards } = useContext(CardsContext);
  const { setMessages } = useContext(MessagesContext);

  const handleError = (err: IApiError) => {
    setMessages((messages) => [
      {
        message:
          err.detail?.non_field_errors?.join(' ') ||
          err.message ||
          'Ошибка сервера',
        type: ApiMessageTypes.error,
      },
      ...messages,
    ]);
  };

  function handleClick(e: MouseEvent) {
    //NOTE: Cancelling event bubbling to prevent firing card click
    e.stopPropagation();
    api
      .changeCardLikeStatus(cardId, !isLiked)
      .then((res) => {
        const newCards = cards.map((item) =>
          item.card.id === cardId ? res : item
        );
        setCards && setCards(newCards);
      })
      .catch(handleError);
  }

  return (
    <IconButton
      sx={isDark ? iconButtonDarkStyle : iconButtonLightStyle}
      onClick={(e) => handleClick(e)}
    >
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
