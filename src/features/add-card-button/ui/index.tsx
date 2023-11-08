import { FC } from 'react';
import { Button } from '@mui/material';
import { style } from './style';

interface AddCardButton {
  text: string;
  onClick(): void;
}

export const AddCardButton: FC<AddCardButton> = ({ text, onClick }) => {
  function handleClick() {
    onClick();
  }

  return (
    <Button variant="outlined" sx={{ ...style }} onClick={handleClick}>
      {text}
    </Button>
  );
};
