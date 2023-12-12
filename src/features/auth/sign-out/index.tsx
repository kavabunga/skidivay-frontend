import { ButtonProps } from '@mui/material';
import { ComponentType, FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '..';
import { UserContext, CardsContext, MessagesContext } from '~/app';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';

interface ISignOut extends ButtonProps {
  element: ComponentType<ButtonProps>;
}

export const SignOut: FC<ISignOut> = ({ element: Component, ...props }) => {
  const { setUser } = useContext(UserContext);
  const { setCards } = useContext(CardsContext);
  const { setMessages } = useContext(MessagesContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut()
      .then((res) => {
        setUser && setUser(null);
        setCards && setCards([]);
        setMessages((messages) => [
          {
            message: res.message,
            type: ApiMessageTypes.info,
          },
          ...messages,
        ]);
      })
      .then(() => navigate('/'))
      .catch((err: IApiError) => {
        setMessages((messages) => [
          {
            message: err.message,
            type: ApiMessageTypes.error,
          },
          ...messages,
        ]);
      });
  };
  return <Component {...props} onClick={handleSignOut} />;
};
