import { FC } from 'react';
import { Card, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CardProps } from '~/shared/types';
import { cardStyle, iconButtonStyle, titleStyle } from './style';

export const CardSmall: FC<CardProps> = ({ shopName, isLiked, shopLogo }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundImage: shopLogo ? `url(${shopLogo})` : '',
        backgroundColor: shopLogo ? '' : '#52358f',
        ...cardStyle,
      }}
    >
      <IconButton size="small" sx={{ ...iconButtonStyle }}>
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      {!shopLogo && <Typography sx={{ ...titleStyle }}>{shopName}</Typography>}
    </Card>
  );
};
