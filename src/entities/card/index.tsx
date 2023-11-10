import { FC } from 'react';
import { Box, IconButton, Container, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { boxStyle, iconButtonStyle, barcodeStyle, titleStyle } from './styles';
import Barcode from 'react-barcode';

interface CardProps {
  name: string;
  number: string;
  category: string;
  _id: string | number;
  isLiked: boolean;
  url?: string;
}

export const Card: FC<CardProps> = ({ name, isLiked, url, number }) => {
  return (
    <>
      <Container>
        {url ? (
          <Box sx={{ backgroundImage: `url(${url})`, ...boxStyle }}>
            <IconButton sx={{ ...iconButtonStyle }}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Box sx={{ ...barcodeStyle }}>
              <Barcode value={number} />
            </Box>
            <Box sx={{ ...barcodeStyle }}>
              <Barcode value={number} />
            </Box>
          </Box>
        ) : (
          <Box sx={{ backgroundColor: '#52358f', ...boxStyle }}>
            <IconButton sx={{ ...iconButtonStyle }}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography sx={{ ...titleStyle }}>{name}</Typography>
            <Box sx={{ ...barcodeStyle }}>
              <Barcode value={number} />
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};
