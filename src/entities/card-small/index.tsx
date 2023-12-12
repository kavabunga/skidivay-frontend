import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Box, Typography } from '@mui/material';
import { Liker, FriendCardLabel } from '~/features';
import { ICardContext } from '~/shared/types';
import { cardStyle, titleStyle, labelsWrapper } from './style';

export const CardSmall: FC<{ item: ICardContext }> = ({ item, ...props }) => {
  const shopName = item.card.shop?.name;
  const shopLogo = item.card.shop?.logo;
  const cardId = item.card.id;
  const isOwner = item.owner;
  const isLiked = item.favourite;
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundImage: shopLogo ? `url(${shopLogo})` : '',
        backgroundColor: shopLogo ? '' : '#594D71',
        ...cardStyle,
      }}
      onClick={() => navigate(`/card/${item.card.id}`, { relative: 'path' })}
      {...props}
    >
      {!shopLogo && <Typography sx={{ ...titleStyle }}>{shopName}</Typography>}
      <Box sx={{ ...labelsWrapper }}>
        <FriendCardLabel isSharied={!isOwner} />
        <Liker cardId={cardId} isLiked={isLiked} isDark={false} />
      </Box>
    </Card>
  );
};
