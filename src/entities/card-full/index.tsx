import { FC } from 'react';
import Barcode from 'react-barcode';
import { Box, Card, Typography } from '@mui/material';
import { ICardContext } from '~/shared';
import { cardStyle, barcodeStyle, titleStyle } from './style';

export const CardFull: FC<{ item: ICardContext }> = ({ item }) => {
  const shopName = item.card.shop.name;
  const shopLogo = item.card.shop.logo;
  const barcodeNumber = item.card.barcode_number;
  return (
    <Card
      sx={{
        backgroundImage: shopLogo ? `url(${shopLogo})` : '',
        backgroundColor: shopLogo ? '' : '#52358f',
        ...cardStyle,
      }}
    >
      {!shopLogo && <Typography sx={titleStyle}>{shopName}</Typography>}
      {barcodeNumber && (
        <Box sx={{ ...barcodeStyle }}>
          <Barcode
            displayValue={false}
            margin={0}
            value={barcodeNumber}
            width={1.5}
          />
        </Box>
      )}
    </Card>
  );
};
