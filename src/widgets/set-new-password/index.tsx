import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { MessagesContext } from '~/app';
import { SetNewPasswordForm } from '~/features';
import { api } from '~/shared';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';
import { containerStyle, titleStyle } from './style';
import { BackButton } from '~/features';

export const SetNewPasswordWidget = () => {
  const navigate = useNavigate();
  const { setMessages } = useContext(MessagesContext);
  const { uid, token } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (err: IApiError) => {
    setMessages((messages) => [
      {
        message: err.message,
        type: ApiMessageTypes.error,
      },
      ...messages,
    ]);
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

  function handleSubmit(newPassword: string) {
    setIsLoading(true);
    api
      .setNewPassword({
        uid: uid || '',
        token: token || '',
        new_password: newPassword,
      })
      .then(() => {
        setIsLoading(false);
        handleSuccess();
      })
      .catch((err) => {
        setIsLoading(false);
        handleError(err);
      })
      .finally(() => {
        setTimeout(() => navigate('/auth', { replace: true }), 5000);
      });
  }

  if (isLoading) {
    return <Typography sx={titleStyle}>Подождите, пожалуйста</Typography>;
  } else {
    return (
      <Container component="section" sx={containerStyle}>
        <BackButton />
        <Typography component="h1" sx={titleStyle}>
          Изменить пароль
        </Typography>
        <SetNewPasswordForm handleSubmit={handleSubmit} />
      </Container>
    );
  }
};
