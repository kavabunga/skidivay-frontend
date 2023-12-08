import { FC, useContext } from 'react';
import { Container, Typography } from '@mui/material';
import { ChangeEmailForm } from '~/features';
import { api, IChangeEmailRequest } from '~/shared';
import { ApiMessageTypes } from '~/shared/enums';
import { MessagesContext, UserContext } from '~/app';
import { containerStyle, titleStyle } from './style';
import { BackButton } from '~/features';

export const ChangeEmailWidget: FC<{
  handleShowRegistrationSuccess: () => void;
}> = ({ handleShowRegistrationSuccess }) => {
  const { setMessages } = useContext(MessagesContext);
  const { user, setUser } = useContext(UserContext);

  const handleSuccess = () => {
    setMessages((messages) => [
      {
        message: 'Email изменён!',
        type: ApiMessageTypes.success,
      },
      ...messages,
    ]);
  };

  function handleSubmit(data: IChangeEmailRequest) {
    return api
      .changeEmail(data)
      .then((res) => setUser && setUser(res))
      .then(() => {
        handleSuccess();
        handleShowRegistrationSuccess();
      });
  }

  return (
    <Container component="section" sx={containerStyle}>
      <BackButton />
      <Typography component="h1" sx={titleStyle}>
        Изменить почту
      </Typography>
      <ChangeEmailForm
        oldEmail={user ? user.email : ''}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};
