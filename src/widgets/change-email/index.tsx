import { FC } from 'react';
import { Container, Typography } from '@mui/material';
import { ChangeEmailForm } from '~/features';
import { api, IChangeEmailRequest } from '~/shared';
import { containerStyle, paragraphStyle } from './style';
import { useUser } from '~/shared/store/useUser';
import { useMessages } from '~/shared/store';

export const ChangeEmailWidget: FC<{
  handleShowRegistrationSuccess: () => void;
}> = ({ handleShowRegistrationSuccess }) => {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);

  function handleSubmit(data: IChangeEmailRequest) {
    //NOTE: Check if email in the form is not the same as current one
    if (data.email !== user?.email) {
      return api
        .changeEmail(data)
        .then((res) => setUser(res))
        .then(() => {
          addSuccessMessage('Email изменён!');
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
