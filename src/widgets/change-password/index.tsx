import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
} from '@mui/material';
import { AccentButton, OutlineButton } from '~/shared/ui';
import {
  BackButtonToUserProfile,
  requestResetPassword,
  ChangePasswordForm,
} from '~/features';
import { IApiError } from '~/shared/errors';
import {
  api,
  IRequestResetPassword,
  IChangePasswordRequest,
  Popup,
} from '~/shared';
import {
  containerStyle,
  titleStyle,
  titlePopupStyle,
  textPopupStyle,
  itemPopupStyle,
} from './style';
import { useUser } from '~/shared/store/useUser';
import { useMessages } from '~/shared/store';

export const ChangePasswordWidget: FC<{
  onShowPasswordResetSuccess: () => void;
}> = ({ onShowPasswordResetSuccess }) => {
  const navigate = useNavigate();
  const user = useUser((state) => state.user);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const [isConfirmSendPasswordOpen, setIsConfirmSendPasswordOpen] =
    useState(false);

  const handlePopupOpen = () => {
    setIsConfirmSendPasswordOpen(true);
  };

  const handlePopupClose = () => {
    setIsConfirmSendPasswordOpen(false);
  };

  const handleResetPassword = () => {
    const request: IRequestResetPassword = {
      phone_last_digits:
        user?.phone_number?.replace(/\D/g, '').replace(/^7/, '').slice(6) ?? '',
      email: user?.email ?? '',
    };
    console.log(request);
    return requestResetPassword(request).then(() =>
      onShowPasswordResetSuccess()
    );
  };

  function handleSubmit(data: IChangePasswordRequest) {
    return api
      .changePassword(data)
      .then(() => {
        addSuccessMessage('Пароль успешно изменён');
        setTimeout(() => navigate('/', { replace: true }), 3000);
      })
      .catch((err: IApiError) =>
        addErrorMessage(err.message || 'Ошибка сервера')
      );
  }

  return (
    <Container component="section" sx={containerStyle}>
      <BackButtonToUserProfile />
      <Typography component="h1" variant="h1" sx={titleStyle}>
        Изменить пароль
      </Typography>
      <ChangePasswordForm handleSubmit={handleSubmit} />
      <OutlineButton type="button" onClick={handlePopupOpen}>
        Не помню пароль
      </OutlineButton>
      <Popup
        open={isConfirmSendPasswordOpen}
        onClose={handlePopupClose}
        showCloseButton={true}
      >
        <DialogTitle sx={titlePopupStyle}>Отправить письмо?</DialogTitle>
        <DialogContent sx={itemPopupStyle}>
          <DialogContentText sx={textPopupStyle}>
            {`Мы можем сбросить старый пароль, отправив ссылку на почту ${user?.email}`}
          </DialogContentText>
        </DialogContent>
        <Stack useFlexGap>
          <AccentButton
            sx={{ marginTop: '.5rem' }}
            onClick={handleResetPassword}
          >
            Отправить
          </AccentButton>
        </Stack>
      </Popup>
    </Container>
  );
};
