import { FC } from 'react';
import { Typography } from '@mui/material';
import logoPath from '~/shared/assets/logo.svg';
import './style.css';
import style from './style';

type Logo = {
  type: 'image' | 'full';
};

export const Logo: FC<Logo> = ({ type }) => {
  return (
    <div className="logo">
      <img className="logo__image" alt="Логотип проекта" src={logoPath} />
      {type === 'full' && (
        <Typography sx={style.title} paragraph>
          Скидывай
        </Typography>
      )}
    </div>
  );
};
