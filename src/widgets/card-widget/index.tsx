import { useState } from 'react';
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
import { Popup, FriendIcon, api } from '~/shared';
import { IApiError } from '~/shared/errors';
import { useUser } from '~/shared/store/useUser';
import { useMessages } from '~/shared/store';
import { useShallow } from 'zustand/react/shallow';

export const CardWidget = () => {
  const id = useParams().id;
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);
  const card = useUser(
    useShallow((state) =>
      state.cards.find((item) => item.card.id.toString() === id)
    )
  );
  const deleteCard = useUser((state) => state.deleteCard);
  const navigate = useNavigate();
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isShareActive, setIsShareActive] = useState(false);
  const cardId = Number(id);

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
    const removingCard = card;
    api
      .deleteCard(cardId)
      .then(() => {
        return deleteCard(cardId);
      })
      .then(() => {
        addSuccessMessage(
          `Карта №${
            removingCard?.card.card_number || removingCard?.card.barcode_number
          } удалена`
        );
        navigate('/');
      })
      .catch((err: IApiError) => {
        addErrorMessage(
          err.detail?.non_field_errors?.join(' ') ||
            err.message ||
            'Ошибка сервера'
        );
      });
  };

  return (
    card && (
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
              <Liker cardId={cardId} isLiked={card.favourite} isDark={true} />
              {card.owner && (
                <IconButton onClick={handleEditEnable} sx={{ padding: 0 }}>
                  <CreateOutlinedIcon />
                </IconButton>
              )}
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
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={handleActivateShareCard}
            >
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
    )
  );
};
