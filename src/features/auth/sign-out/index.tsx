import { ButtonProps } from '@mui/material';
import { ComponentType, FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '..';
import { UserContext, CardsContext, MessagesContext } from '~/app';
import { IApiError } from '~/shared/errors';
import { ApiMessageTargets, ApiMessageTypes } from '~/shared/enums';

interface ISignOut extends ButtonProps {
  element: ComponentType<ButtonProps>;
}

export const SignOut: FC<ISignOut> = ({ element: Component, ...props }) => {
  const { setUser } = useContext(UserContext);
  const { setCards } = useContext(CardsContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut()
      .then(() => {
        setUser && setUser(null);
        setCards && setCards([]);
      })
      .then(() => navigate('/'))
      .catch((err: IApiError) => {
        setMessages([
          {
            message: err.message,
            type: ApiMessageTypes.error,
            target: ApiMessageTargets.snack,
          },
          ...messages,
        ]);
      });
  };
  return <Component {...props} onClick={handleSignOut} />;
};
