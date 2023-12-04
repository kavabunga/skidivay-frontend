import { useContext, useState } from 'react';

import { Container, Typography } from '@mui/material';
import { ChangeEmailForm } from '~/features';
import { api, IChangeEmailRequest } from '~/shared';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';
import { MessagesContext, UserContext } from '~/app';
import { containerStyle, titleStyle } from './style';
import { BackButton } from '~/features';

export const ChangeEmailWidget = (
  handleShowRegistrationSuccess: () => void
) => {
  const { setMessages } = useContext(MessagesContext);
  const { user } = useContext(UserContext);
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
        message: 'Email изменён!',
        type: ApiMessageTypes.success,
      },
      ...messages,
    ]);
  };

  function handleSubmit(newEmail: IChangeEmailRequest) {
    setIsLoading(true);
    api
      .changeEmail(newEmail)
      .then(() => {
        setIsLoading(false);
        handleSuccess();
      })
      .catch((err) => {
        setIsLoading(false);
        handleError(err);
      })
      .finally(() => {
        handleShowRegistrationSuccess();
      });
  }

  if (isLoading) {
    return <Typography sx={titleStyle}>Подождите, пожалуйста</Typography>;
  } else {
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
  }
};
