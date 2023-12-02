import { Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessagesContext, UserContext } from '~/app';
import { SignInForm } from '~/features';
import { api } from '~/shared';
import { stackStyle, titleStyle, paragraphStyle } from './style';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';

export const Activation = () => {
  const { setMessages } = useContext(MessagesContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
          message: 'Почта подтверждена',
          type: ApiMessageTypes.success,
        },
        ...messages,
      ]);
    };
    if (user) {
      api
        .activateEmail(uid || '', token || '')
        .then(() => {
          handleSuccess();
        })
        .catch(handleError)
        .finally(() => navigate('/', { replace: true }));
    }
    setIsLoading(false);
  }, [user, uid, token, navigate, setMessages]);

  if (isLoading) {
    return <Typography sx={titleStyle}>Подождите, пожалуйста</Typography>;
  } else {
    return (
      <Stack
        component="section"
        direction="column"
        useFlexGap={true}
        sx={stackStyle}
      >
        <Typography component="h1" sx={titleStyle}>
          Вход
        </Typography>
        <Typography component="p" sx={paragraphStyle}>
          Для активации почты необходимо войти в аккаунт
        </Typography>
        <SignInForm type="activation" />
      </Stack>
    );
  }
};
