import { FC } from 'react';
import { Card, Box, Typography } from '@mui/material';
import { Liker } from '~/features';
import { ICardContext } from '~/shared/types';
import { cardStyle, titleStyle, likerWrapperStyle } from './style';

interface CardSmallProps {
  item: ICardContext;
}

export const CardSmall: FC<CardSmallProps> = ({ item }) => {
  const shopName = item.card.shop?.name || '';
  const shopLogo = item.card.shop?.logo || '';
  const cardId = item.card.id;
  const isLiked = item.favourite;

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundImage: shopLogo ? `url(${shopLogo})` : '',
        backgroundColor: shopLogo ? '' : '#52358f',
        ...cardStyle,
      }}
    >
      {!shopLogo && <Typography sx={{ ...titleStyle }}>{shopName}</Typography>}
      <Box sx={{ ...likerWrapperStyle }}>
        <Liker cardId={cardId} isLiked={isLiked} />
      </Box>
    </Card>
  );
};
