import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import logoPath from '~/shared/assets/logo.svg';
import './style.css';
import style from './style';

type Logo = {
  type: 'image' | 'full';
};

export const Logo: FC<Logo> = ({ type }) => {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate('/')}>
      <img className="logo__image" alt="Логотип проекта" src={logoPath} />
      {type === 'full' && (
        <Typography sx={style.title} paragraph>
          Скидывай
        </Typography>
      )}
    </div>
  );
};
