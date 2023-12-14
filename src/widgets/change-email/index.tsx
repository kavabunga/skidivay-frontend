import { FC, useContext } from 'react';
import { Container, Typography } from '@mui/material';
import { ChangeEmailForm } from '~/features';
import { api, IChangeEmailRequest } from '~/shared';
import { ApiMessageTypes } from '~/shared/enums';
import { MessagesContext, UserContext } from '~/entities';
import { containerStyle, paragraphStyle } from './style';

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
    if (data.email !== user?.email) {
      return api
        .changeEmail(data)
        .then((res) => setUser && setUser(res))
        .then(() => {
          handleSuccess();
          handleShowRegistrationSuccess();
        });
    } else {
      handleShowRegistrationSuccess();
      return Promise.resolve();
    }
  }

  return (
    <Container component="section" sx={containerStyle}>
      <Typography textAlign="center" sx={paragraphStyle}>
        Проверьте адрес, на который было отправлено письмо о подтверждении
      </Typography>
      <ChangeEmailForm
        oldEmail={user ? user.email : ''}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};
