import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { SetNewPasswordForm } from '~/features';
import { api } from '~/shared';
import { containerStyle, titleStyle } from './style';
import { BackButton } from '~/features';
import { useMessages } from '~/shared/store';

export const SetNewPasswordWidget = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);

  function handleSubmit(newPassword: string) {
    return api
      .setNewPassword({
        uid: uid || '',
        token: token || '',
        new_password: newPassword,
      })
      .then(() => {
        addSuccessMessage('Пароль успешно изменён');
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
