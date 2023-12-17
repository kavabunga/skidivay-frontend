import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
} from '@mui/material';
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
  buttonStyle,
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
      phone_last_digits: user?.phone_number?.slice(6) ?? '',
      email: user?.email ?? '',
    };
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
      <Button variant="outlined" sx={buttonStyle} onClick={handlePopupOpen}>
        Не помню пароль
      </Button>
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
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={handleResetPassword}
          >
            Отправить
          </Button>
        </Stack>
      </Popup>
    </Container>
  );
};
