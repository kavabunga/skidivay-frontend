import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { UserContext, MessagesContext } from '~/app';
import {
  BackButtonToUserProfile,
  requestResetPassword,
  ChangePasswordForm,
} from '~/features';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';
import { api, IRequestResetPassword, IChangePasswordRequest } from '~/shared';
import { containerStyle, titleStyle, buttonStyle } from './style';

export const ChangePasswordWidget: FC<{
  onShowPasswordResetSuccess: () => void;
}> = ({ onShowPasswordResetSuccess }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setMessages } = useContext(MessagesContext);

  const handleResetPassword = () => {
    const request: IRequestResetPassword = {
      phone_last_digits: user?.phone_number?.slice(6) ?? '',
      email: user?.email ?? '',
    };
    return requestResetPassword(request).then(() =>
      onShowPasswordResetSuccess()
    );
  };

  const handleSuccess = () => {
    setMessages((messages) => [
      {
        message: 'Пароль изменён!',
        type: ApiMessageTypes.success,
      },
      ...messages,
    ]);
  };

  function handleSubmit(data: IChangePasswordRequest) {
    return api
      .changePassword(data)
      .then(() => {
        handleSuccess();
        setTimeout(() => navigate('/', { replace: true }), 3000);
      })
      .catch((err: IApiError) => {
        setMessages((messages) => [
          {
            message: err.message,
            type: ApiMessageTypes.error,
          },
          ...messages,
        ]);
      });
  }

  return (
    <Container component="section" sx={containerStyle}>
      <BackButtonToUserProfile />
      <Typography component="h1" variant="h1" sx={titleStyle}>
        Изменить пароль
      </Typography>
      <ChangePasswordForm handleSubmit={handleSubmit} />
      <Button variant="outlined" sx={buttonStyle} onClick={handleResetPassword}>
        Не помню пароль
      </Button>
    </Container>
  );
};
