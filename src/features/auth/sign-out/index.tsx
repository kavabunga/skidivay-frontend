import { ComponentType, FC } from 'react';
import { ButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signOut } from '..';
import { IApiError } from '~/shared/errors';
import { useUser } from '~/shared/store/useUser';
import { useMessages } from '~/shared/store';

interface ISignOut extends ButtonProps {
  element: ComponentType<ButtonProps>;
}

export const SignOut: FC<ISignOut> = ({ element: Component, ...props }) => {
  const setUser = useUser((state) => state.setUser);
  const setCards = useUser((state) => state.setCards);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);
  const addErrorMessage = useMessages((state) => state.addInfoMessage);

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut()
      .then((res) => {
        setUser(null);
        setCards([]);
        addSuccessMessage(res.message);
        navigate('/');
      })
      .catch((err: IApiError) => addErrorMessage(err.message));
  };
  return <Component {...props} onClick={handleSignOut} />;
};
