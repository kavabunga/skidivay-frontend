import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { MessagesContext, UserContext } from '~/app';
import { deleteUser, DeleteUserForm } from '~/features';
import { IDeleteUserRequest } from '~/shared';
import { ApiMessageTypes } from '~/shared/enums';
import { containerStyle, titleStyle } from './style';
import { BackButton } from '~/features';

export const DeleteUserWidget = () => {
  const navigate = useNavigate();
  const { setMessages } = useContext(MessagesContext);
  const { user } = useContext(UserContext);

  const handleSuccess = () => {
    setMessages((messages) => [
      {
        message: 'Ваш аккаунт удалён!',
        type: ApiMessageTypes.success,
      },
      ...messages,
    ]);
  };

  function handleSubmit(data: IDeleteUserRequest) {
    return deleteUser(data, user?.id || 0).then(() => {
      handleSuccess();
      setTimeout(() => navigate('/auth', { replace: true }), 3000);
    });
  }

  return (
    <Container component="section" sx={containerStyle}>
      <BackButton />
      <Typography component="h1" sx={titleStyle}>
        Удалить аккаунт
      </Typography>
      <DeleteUserForm handleSubmit={handleSubmit} />
    </Container>
  );
};
