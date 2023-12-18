import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SignInForm } from '~/features';
import { Preloader, api } from '~/shared';
import { stackStyle, titleStyle, paragraphStyle } from './style';
import { IApiError } from '~/shared/errors';
import { useUser } from '~/shared/store/useUser';
import { useLoading, useMessages } from '~/shared/store';

export const Activation = () => {
  const loading = useLoading((state) => state.loading);
  const loaded = useLoading((state) => state.loaded);
  const isLoading = useLoading((state) => state.isLoading);
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);
  const user = useUser((state) => state.user);
  const navigate = useNavigate();
  const { uid, token } = useParams();

  useEffect(() => {
    loading();
    const handleError = (err: IApiError) => {
      addErrorMessage(
        err.detail?.non_field_errors?.join(' ') ||
          err.message ||
          'Ошибка сервера'
      );
    };
    const handleSuccess = () => {
      addSuccessMessage('Ваш Email успешно подтвержден');
    };
    if (user && user.email !== '' && !user.is_active) {
      api
        .activateEmail(uid || '', token || '')
        .then(handleSuccess)
        .catch(handleError)
        .finally(() => {
          navigate('/', { replace: true });
          handleSuccess();
        });
    } else if (user?.is_active) {
      handleSuccess();
    }
    loaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return isLoading ? (
    <Preloader />
  ) : (
    <Stack
      component="section"
      direction="column"
      useFlexGap={true}
      sx={stackStyle}
    >
      <Typography component="p" sx={paragraphStyle}>
        Для активации почты необходимо войти в свою учетную запись
      </Typography>
      <Typography component="h1" sx={titleStyle}>
        Вход
      </Typography>
      <SignInForm type="activation" />
    </Stack>
  );
};
