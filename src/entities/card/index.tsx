import { FC } from 'react';
import { useState } from 'react';
import { Box, Paper, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { boxStyle, iconButtonStyle } from './styles';

type CardProps = {
  card: {
    _id: string;
    name: string;
    number: string;
    url: string;
    category: string;
    isLiked: boolean;
  };
  onClickCard(name: string, number: string, url: string): void;
  onClickLike(card: {
    _id: string;
    name: string;
    number: string;
    url: string;
    category: string;
    isLiked: boolean;
  }): void;
};

export const Card: FC<CardProps> = ({ card, onClickCard, onClickLike }) => {
  const [isLiked, setIsLiked] = useState(card.isLiked);

  function handleClick() {
    onClickCard(card.name, card.url, card.number);
  }

  function handleLikeClick() {
    setIsLiked(!isLiked);
    onClickLike(card);
  }

  return (
    <>
      <Paper elevation={2} sx={{ borderRadius: '20px' }}>
        <Box
          component="img"
          sx={{ ...boxStyle }}
          alt={`скидочная карта от ${card.name}`}
          src={card.url || '#'}
          onClick={handleClick}
        />
      </Paper>
      <IconButton
        aria-label="heart symbol"
        sx={{ ...iconButtonStyle }}
        onClick={handleLikeClick}
      >
        {card.isLiked ? (
          <FavoriteIcon fontSize="medium" />
        ) : (
          <FavoriteBorderIcon fontSize="medium" />
        )}
      </IconButton>
    </>
  );
};
