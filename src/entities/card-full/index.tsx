import { FC } from 'react';
import Barcode from 'react-barcode';
import { Box, Card, Typography } from '@mui/material';
import { ICardContext } from '~/shared';
import { titleStyle, cardStyle, barcodeStyle } from './style';

export const CardFull: FC<{ item: ICardContext }> = ({ item }) => {
  const shopName = item.card.shop.name;
  const shopLogo = item.card.shop.logo;
  const barcodeNumber = item.card.barcode_number;
  return (
    <Card
      sx={{
        backgroundImage: shopLogo ? `url(${shopLogo})` : '',
        backgroundColor: shopLogo ? '' : '#594D71',
        ...cardStyle,
      }}
      elevation={0}
    >
      {!shopLogo && <Typography sx={titleStyle}>{shopName}</Typography>}
      {barcodeNumber && (
        <Box sx={{ ...barcodeStyle }}>
          <Barcode
            displayValue={false}
            margin={0}
            value={barcodeNumber}
            width={1.3}
          />
        </Box>
      )}
    </Card>
  );
};
