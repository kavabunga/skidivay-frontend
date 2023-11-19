import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, IconButton, Stack, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { BackButton } from '~/features';
import { CardFull, EditCardForm } from '~/entities';
import { Liker } from '~/features';
import { buttonStyle, topButtonsStyle, likerWrapperStyle } from './style';
import { CardsContext } from '~/app';

//NOTE: Getting Card ID as useParams().id through Router's dynamic route
export const CardWidget = () => {
  const [isEditActive, setIsEditActive] = useState(false);
  const id = useParams().id;
  const { cards } = useContext(CardsContext);
  const card = cards.find((item) => item.card.id.toString() == id);
  const { cardNumber, barcodeNumber } = card.card;
  const cardId = card.card.id;
  const isLiked = card.favourite;

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
            <Box sx={{ ...likerWrapperStyle }}>
              <Liker cardId={cardId} isLiked={isLiked} />
            </Box>
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
