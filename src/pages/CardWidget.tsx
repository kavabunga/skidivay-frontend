import { FC, useState } from 'react';
import { Box, Button, Container, IconButton, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CreateIcon from '@mui/icons-material/Create';

import { BackButton } from '~/features';
import { EditCardForm } from '~/entities';

interface CardWidgetProps {
  id?: number;
  name?: string;
  cardNumber: string;
  barcodeNumber: number | string;
  shopName?: string | null;
  shopLogo?: string | null;
}

export const CardWidget: FC<CardWidgetProps> = ({
  // id,
  // name,
  cardNumber = '1111 1383 0039 3838 49994',
  barcodeNumber = '113839895849854',
  // shopName,
  // shopLogo,
}) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const handleEditToggle = () => {
    setIsEditActive(() => !isEditActive);
  };
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          minWidth: '20.5rem',
          padding: '1.5rem 0 1rem',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <BackButton />
          <Stack direction="row">
            <IconButton sx={{ padding: 0.5 }}>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton onClick={handleEditToggle} sx={{ padding: 0.5 }}>
              <CreateIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
      {/* //NOTE: Place for Card component */}
      <EditCardForm
        isActive={isEditActive}
        cardNumberValue={cardNumber}
        barcodeValue={barcodeNumber.toString()}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 0 2.5rem',
          rowGap: '.5rem',
        }}
      >
        <Button
          variant="contained"
          sx={{
            fontSize: '0.875rem',
            minWidth: '20.5rem',
            padding: '1.125rem 0',
            textTransform: 'none',
          }}
        >
          Поделиться картой
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: '0.875rem',
            minWidth: '20.5rem',
            padding: '1.125rem 0',
            textTransform: 'none',
          }}
        >
          Удалить карту
        </Button>
      </Box>
    </Container>
  );
};
