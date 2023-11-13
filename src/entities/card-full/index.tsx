import { FC } from 'react';
import { Box, Card, Typography } from '@mui/material';
import Barcode from 'react-barcode';
import { CardProps } from '~/shared/types';
import { cardStyle, barcodeStyle, titleStyle } from './style';

export const CardFull: FC<CardProps> = ({
  shopName,
  shopLogo,
  barcodeNumber,
}) => {
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
          value={barcodeNumber ? barcodeNumber : ''}
          format={'EAN13'}
        />
      </Box>
    </Card>
  );
};
