import { FC } from 'react';
import Barcode from 'react-barcode';
import { Box, Card, Typography } from '@mui/material';
import { ICardContext } from '~/shared';
import { cardStyle, barcodeStyle, titleStyle } from './style';

interface CardFullProps {
  item: ICardContext;
}

export const CardFull: FC<CardFullProps> = ({ item }) => {
  const shopName = item.card.shop?.name || '';
  const shopLogo = item.card.shop?.logo || '';
  const barcodeNumber = item.card.barcode_number || '';
  return (
    <Card
      sx={{
        backgroundImage: shopLogo ? `url(${shopLogo})` : '',
        backgroundColor: shopLogo ? '' : '#52358f',
        ...cardStyle,
      }}
    >
      {!shopLogo && <Typography sx={titleStyle}>{shopName}</Typography>}
      <Box sx={{ ...barcodeStyle }}>
        <Barcode
          displayValue={false}
          margin={0}
          value={barcodeNumber}
          // format={'EAN13'}
        />
      </Box>
    </Card>
  );
};
