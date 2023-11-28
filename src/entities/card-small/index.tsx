import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Box, Typography } from '@mui/material';
import { Liker } from '~/features';
import { ICardContext } from '~/shared/types';
import { cardStyle, titleStyle, likerWrapperStyle } from './style';

export const CardSmall: FC<{ item: ICardContext }> = ({ item, ...props }) => {
  const shopName = item.card.shop?.name;
  const shopLogo = item.card.shop?.logo;
  const cardId = item.card.id;
  const isLiked = item.favourite;
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundImage: shopLogo ? `url(${shopLogo})` : '',
        backgroundColor: shopLogo ? '' : '#52358f',
        ...cardStyle,
      }}
      onClick={() => navigate(`/card/${item.card.id}`, { relative: 'path' })}
      {...props}
    >
      {!shopLogo && <Typography sx={{ ...titleStyle }}>{shopName}</Typography>}
      <Box sx={{ ...likerWrapperStyle }}>
        <Liker cardId={cardId} isLiked={isLiked} />
      </Box>
    </Card>
  );
};
