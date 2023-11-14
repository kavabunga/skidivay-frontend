import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, IconButton, Stack, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import { BackButton } from '~/features';
import { CardFull, EditCardForm } from '~/entities';
import { CardProps } from '~/shared/types';
import { buttonStyle, topButtonsStyle } from './style';
import { defaultCards } from '~/shared/mock/default-cards';
import { defaultCard } from '~/shared/mock/default-card';

//NOTE: Getting Card ID as useParams().id through Router's dynamic route
export const CardWidget = () => {
  const id = useParams().id;
  const card: CardProps =
    defaultCards.find((card) => card._id === id) || defaultCard;
  const { cardNumber, barcodeNumber, isLiked } = card;
  const [isEditActive, setIsEditActive] = useState(false);

  const handleEditEnable = () => {
    setIsEditActive(true);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={topButtonsStyle}
      >
        <BackButton />
        {!isEditActive && (
          <Stack direction="row">
            <IconButton sx={{ padding: 0.5 }}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton onClick={handleEditEnable} sx={{ padding: 0.5 }}>
              <CreateIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
      <Box
        sx={{
          paddingY: 1.5,
        }}
      >
        <CardFull {...card} />
      </Box>

      <EditCardForm
        isActive={isEditActive}
        cardNumberValue={cardNumber ? cardNumber : ''}
        barcodeNumberValue={barcodeNumber ? barcodeNumber : ''}
      />
      {!isEditActive && (
        <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap>
          <Button variant="contained" sx={buttonStyle}>
            Поделиться картой
          </Button>
          <Button variant="outlined" sx={buttonStyle}>
            Удалить карту
          </Button>
        </Stack>
      )}
    </Container>
  );
};
