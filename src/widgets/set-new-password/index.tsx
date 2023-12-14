import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { MessagesContext } from '~/entities';
import { SetNewPasswordForm } from '~/features';
import { api } from '~/shared';
import { ApiMessageTypes } from '~/shared/enums';
import { containerStyle, titleStyle } from './style';
import { BackButton } from '~/features';

export const SetNewPasswordWidget = () => {
  const navigate = useNavigate();
  const { setMessages } = useContext(MessagesContext);
  const { uid, token } = useParams();

  const handleSuccess = () => {
    setMessages((messages) => [
      {
        message: 'Пароль успешно изменён',
        type: ApiMessageTypes.success,
      },
      ...messages,
    ]);
  };

  function handleSubmit(newPassword: string) {
    return api
      .setNewPassword({
        uid: uid || '',
        token: token || '',
        new_password: newPassword,
      })
      .then(() => {
        handleSuccess();
        setTimeout(() => navigate('/auth', { replace: true }), 5000);
      });
  }

  return (
    <Container component="section" sx={containerStyle}>
      <BackButton />
      <Typography component="h1" sx={titleStyle}>
        Изменить пароль
      </Typography>
      <SetNewPasswordForm handleSubmit={handleSubmit} />
    </Container>
  );
};
