import { Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '~/app';
import { SignInForm } from '~/features';
import { api } from '~/shared';
import { stackStyle, titleStyle, paragraphStyle } from './style';

export const Activation = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api
        .activateEmail(uid || '', token || '')
        .then(() => {
          console.log('Запрос на активацию отправлен');
          navigate('/', { replace: true });
        })
        .catch((err) => console.log(err));
    }
    setIsLoading(false);
  }, [navigate, user, token, uid]);

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
