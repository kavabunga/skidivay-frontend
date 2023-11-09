import { FC } from 'react';
import { Box, Paper } from '@mui/material';
import { style } from './style';

type PromoCardProps = {
  cardUrl: string;
};

export const PromoCard: FC<PromoCardProps> = ({ cardUrl }) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: '20px' }}>
      <Box
        component="img"
        sx={{ ...style }}
        alt={`скидочная карта`}
        src={cardUrl || '#'}
      />
    </Paper>
  );
};
