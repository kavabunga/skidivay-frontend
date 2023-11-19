import { ButtonProps } from '@mui/material';
import { ComponentType, FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { onSignOut } from '..';
import { UserContext, CardsContext } from '~/app';

interface ISignOut extends ButtonProps {
  element: ComponentType<ButtonProps>;
}

export const SignOut: FC<ISignOut> = ({ element: Component, ...props }) => {
  const { setUser } = useContext(UserContext);
  const { setCards } = useContext(CardsContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    onSignOut()
      .then(() => {
        setUser && setUser(undefined);
        setCards && setCards(undefined);
      })
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };
  return <Component {...props} onClick={handleSignOut} />;
};
