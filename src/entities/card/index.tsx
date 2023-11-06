import { FC } from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type CardProps = {
  card: {
    _id: string;
    name: string;
    number: string;
    url: string;
    category: string;
    isLiked: boolean;
  };
  onClickCard(): void;
  onClickLike(): void;
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
      <Paper
        elevation={2}
        sx={{
          borderRadius: '20px',
        }}
      >
        <Box
          component="img"
          sx={{
            display: 'block',
            width: '100%',
            aspectRatio: '1 / 0.63',
            backgroundColor: '#f6f6f6',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '20px',
            overflow: 'hidden',
            cursor: 'pointer',
            filter: 'brightness(100%)',
            transition: 'filter 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            '&:hover': {
              filter: 'brightness(90%)',
            },
          }}
          alt={`скидочная карта от ${card.name}`}
          src={card.url || '#'}
          onClick={handleClick}
        />
      </Paper>
      <IconButton
        aria-label="heart symbol"
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          color: 'primary.light',
          filter: 'invert(0%)',
          zIndex: '2',
          transition: 'filter 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '&:hover': {
            filter: 'invert(100%)',
          },
        }}
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
