import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { buttonStyle, titleStyle } from './style';

interface AddCardButton {
  text: string;
  onClick(): void;
}

export const AddCardButton: FC<AddCardButton> = ({ text, onClick }) => {
  function handleClick() {
    onClick();
  }

  return (
    <Button variant="outlined" sx={{ ...buttonStyle }} onClick={handleClick}>
      <AddCircleOutlineIcon fontSize="large" />
      <Typography sx={{ ...titleStyle }}>{text}</Typography>
    </Button>
  );
};
