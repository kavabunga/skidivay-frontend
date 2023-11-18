import { ButtonProps } from '@mui/material';
import { ComponentType, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { onSignOut } from '..';

interface ISignOut extends ButtonProps {
  element: ComponentType<ButtonProps>;
}

export const SignOut: FC<ISignOut> = ({ element: Component, ...props }) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    onSignOut().then(() => navigate('/'));
  };
  return <Component {...props} onClick={handleSignOut} />;
};
