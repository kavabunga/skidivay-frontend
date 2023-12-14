import { Stack, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContext, MessagesContext, UserContext } from '~/entities';
import { SignInForm } from '~/features';
import { api } from '~/shared';
import { stackStyle, titleStyle, paragraphStyle } from './style';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';

export const Activation = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const { setMessages } = useContext(MessagesContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { uid, token } = useParams();

  useEffect(() => {
    //TODO: Add here PreLoader for check for login
    setIsLoading && setIsLoading(true);
    const handleError = (err: IApiError) => {
      setMessages((messages) => [
        {
          message: err.detail?.non_field_errors?.join(' ') || err.message,
          type: ApiMessageTypes.error,
        },
        ...messages,
      ]);
    };
    const handleSuccess = () => {
      setMessages((messages) => [
        {
          message: 'Ваш Email успешно подтвержден',
          type: ApiMessageTypes.success,
        },
        ...messages,
      ]);
    };
    if (user?.email !== '' && !user?.is_active) {
      api
        .activateEmail(uid || '', token || '')
        .then(handleSuccess)
        .catch(handleError)
        .finally(() => {
          navigate('/', { replace: true });
          setIsLoading && setIsLoading(false);
        });
    } else if (user?.is_active) {
      handleSuccess();
      setIsLoading && setIsLoading(false);
    } else {
      setIsLoading && setIsLoading(false);
    }
    //NOTE: Disabling deps check to use useEffect only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
