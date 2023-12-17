import { FC, MouseEvent } from 'react';
import { api } from '~/shared';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { iconButtonStyle } from './style';
import { IApiError } from '~/shared/errors';
import { useUser } from '~/shared/store/useUser';
import { useMessages } from '~/shared/store';

interface LikerProps {
  cardId: number;
  isLiked: boolean;
  isDark: boolean;
}

export const Liker: FC<LikerProps> = ({ cardId, isLiked, isDark }) => {
  const likeCard = useUser((state) => state.likeCard);
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const handleError = (err: IApiError) => {
    addErrorMessage(
      err.detail?.non_field_errors?.join(' ') || err.message || 'Ошибка сервера'
    );
  };

  function handleClick(e: MouseEvent) {
    //NOTE: Cancelling event bubbling to prevent firing card click
    e.stopPropagation();
    api
      .changeCardLikeStatus(cardId, !isLiked)
      .then((res) => likeCard(res, cardId))
      .catch(handleError);
  }

  return (
    <IconButton
      size="small"
      sx={{
        color: `${isDark ? 'surface.dark' : '#FFFBFF'}`,
        ...iconButtonStyle,
      }}
      onClick={(e) => handleClick(e)}
    >
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
