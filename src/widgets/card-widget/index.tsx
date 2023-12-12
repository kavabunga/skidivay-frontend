import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  IconButton,
  Stack,
  Box,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { BackButton, CardShareForm } from '~/features';
import { CardFull, CardSharePopup, EditCardForm } from '~/entities';
import { Liker } from '~/features';
import {
  containerStyle,
  buttonStyle,
  topButtonsStyle,
  paragraphStyle,
  deleteTitleStyle,
  deleteTextStyle,
  deleteItemStyle,
} from './style';
import { CardsContext, MessagesContext } from '~/app';
import { ICardContext, Popup, FriendIcon, api } from '~/shared';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';

export const CardWidget = () => {
  const { setMessages } = useContext(MessagesContext);
  const { cards, setCards } = useContext(CardsContext);
  const navigate = useNavigate();
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isShareActive, setIsShareActive] = useState(false);
  const id = useParams().id;
  const cardId = Number(id);
  const card: ICardContext = cards.find(
    (item) => item.card.id.toString() === id
  ) || {
    card: {
      id: 0,
      shop: {
        id: 0,
        group: [
          {
            id: 0,
            name: '',
          },
        ],
        name: 'Карта не найдена',
        logo: null,
        color: '#594D71',
        validation: false,
      },
      name: 'Карта не найдена',
      card_number: '',
      barcode_number: '',
      encoding_type: '',
      pub_date: '',
    },
    shared_by: {
      id: 0,
      name: '',
      email: '',
    },
    owner: true,
    favourite: false,
    pub_date: '',
    usage_counter: 0,
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

  const handleActivateShareCard = () => {
    setIsShareActive(true);
  };

  const handleCancelShareCard = () => {
    setIsShareActive(false);
  };

  const handleRemoveCard = () => {
    api
      .deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter((card) => card.card.id != cardId);
        return setCards && setCards(newCards);
      })
      .then(() => {
        setMessages((messages) => [
          {
            message: 'Карта удалена',
            type: ApiMessageTypes.success,
          },
          ...messages,
        ]);
        navigate('/');
      })
      .catch((err: IApiError) => {
        setMessages((messages) => [
          {
            message: err.detail?.non_field_errors?.join(' ') || err.message,
            type: ApiMessageTypes.error,
          },
          ...messages,
        ]);
      });
  };

  return (
    <Stack useFlexGap sx={containerStyle}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={topButtonsStyle}
      >
        <BackButton />
        {!isEditActive && (
          <Stack direction="row" spacing={1} useFlexGap>
            <Liker cardId={cardId} isLiked={isLiked} isDark={true} />
            <IconButton onClick={handleEditEnable} sx={{ padding: 0 }}>
              <CreateOutlinedIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
      <Box sx={{ paddingY: 1.5 }}>
        <CardFull item={card} />
      </Box>

      {!card.owner && (
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="space-between"
          alignItems="center"
          useFlexGap
          sx={{ paddingY: 1.25 }}
        >
          <FriendIcon />
          <Typography component="p" sx={{ ...paragraphStyle }}>
            {`Этой картой с вами поделился пользователь ${
              card.shared_by?.name ?? ''
            } (${card.shared_by?.email ?? ''})`}
          </Typography>
        </Stack>
      )}

      <EditCardForm
        isActive={isEditActive}
        card={card}
        handleSubmited={handleEditDisable}
      />
      {!isEditActive && (
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          useFlexGap
          sx={{ paddingTop: '.75rem' }}
        >
          {card.owner && (
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={handleActivateShareCard}
            >
              Поделиться картой
            </Button>
          )}
          <Button
            variant="outlined"
            sx={buttonStyle}
            onClick={handleActivateRemoveCard}
          >
            Удалить карту
          </Button>
        </Stack>
      )}
      <Popup
        open={isDeleteActive}
        onClose={handleCancelRemoveCard}
        showCloseButton={false}
      >
        <DialogTitle sx={deleteTitleStyle}>Удалить карту?</DialogTitle>
        <DialogContent sx={deleteItemStyle}>
          <DialogContentText sx={deleteTextStyle}>
            Восстановить карту будет невозможно
          </DialogContentText>
        </DialogContent>
        <Stack useFlexGap spacing={1}>
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
      </Popup>
      <CardSharePopup open={isShareActive} onClose={handleCancelShareCard}>
        <CardShareForm card={card.card} afterSubmit={handleCancelShareCard} />
      </CardSharePopup>
    </Stack>
  );
};
