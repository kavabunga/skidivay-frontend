import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, IconButton, Stack, Box, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { BackButton } from '~/features';
import { CardFull, EditCardForm } from '~/entities';
import { Liker } from '~/features';
import {
  containerStyle,
  buttonStyle,
  topButtonsStyle,
  likerWrapperStyle,
  deleteTitleStyle,
} from './style';
import { CardsContext } from '~/app';
import { api } from '~/shared';

export const CardWidget = () => {
  const { cards, setCards } = useContext(CardsContext);
  const navigate = useNavigate();
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const id = useParams().id;
  const cardId = Number(id);
  const card = cards.find((item) => item.card.id.toString() === id) || {
    card: {
      id: 0,
      name: 'Карта не найдена',
      card_number: '',
      barcode_number: '',
    },
    owner: true,
    favourite: false,
  };
  const isLiked = card.favourite;

  const handleEditEnable = () => {
    setIsEditActive(true);
  };

  const handleEditDisable = () => {
    setIsEditActive(false);
  };

  const handleActivateRemoveCard = () => {
    setIsDeleteActive(true);
  };

  const handleCancelRemoveCard = () => {
    setIsDeleteActive(false);
  };

  const handleRemoveCard = () => {
    api
      .deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter((card) => card.card.id != cardId);
        console.log(newCards);
        return setCards && setCards(newCards);
      })
      .then(() => navigate('/'))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack useFlexGap sx={containerStyle}>
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
        <CardFull item={card} />
      </Box>

      <EditCardForm
        isActive={isEditActive}
        card={card}
        handleSubmited={handleEditDisable}
      />
      {!isEditActive && !isDeleteActive && (
        <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap>
          <Button variant="contained" sx={buttonStyle}>
            Поделиться картой
          </Button>
          <Button
            variant="outlined"
            sx={buttonStyle}
            onClick={handleActivateRemoveCard}
          >
            Удалить карту
          </Button>
        </Stack>
      )}
      {isDeleteActive && (
        <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap>
          <Typography sx={deleteTitleStyle}>Удалить карту?</Typography>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={handleRemoveCard}
          >
            Да, удалить
          </Button>
          <Button
            variant="outlined"
            sx={buttonStyle}
            onClick={handleCancelRemoveCard}
          >
            Нет, не удалять
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
