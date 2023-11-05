import { FC } from 'react';
import { Typography } from '@mui/material';

interface TitleProps {
  text: string;
}

export const Title: FC<TitleProps> = ({ text }) => {
  return (
    <Typography
      component="h1"
      variant="h1"
      color="surface.darker"
      children={text}
    />
  );
};
