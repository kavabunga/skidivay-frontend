import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import logoImageSmall from '~/shared/assets/logo.svg';
import logoImageFullLight from '~/shared/assets/logo-white.svg';
import logoImageFullDark from '~/shared/assets/logo-black.svg';
import { logoStyleFull, logoStyleSmall } from './style';

interface ILogo {
  type: 'image' | 'full';
  color: 'light' | 'dark';
}

export const Logo: FC<ILogo> = ({ type, color }) => {
  const navigate = useNavigate();

  const imageSelector = () => {
    if (type === 'image') {
      return logoImageSmall;
    }
    if (type === 'full' && color === 'light') {
      return logoImageFullLight;
    }
    if (type === 'full' && color === 'dark') {
      return logoImageFullDark;
    }
    return;
  };

  return (
    <Box
      component="img"
      sx={type === 'full' ? logoStyleFull : logoStyleSmall}
      alt="Логотип проекта"
      onClick={() => navigate('/')}
      src={imageSelector()}
    />
  );
};
