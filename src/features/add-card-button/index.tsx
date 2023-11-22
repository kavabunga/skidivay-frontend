import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { buttonStyle, titleStyle } from './style';

interface AddCardButton {
  text: string;
}

export const AddCardButton: FC<AddCardButton> = ({ text }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/card/new');
  }

  return (
    <Button variant="outlined" sx={{ ...buttonStyle }} onClick={handleClick}>
      <AddCircleOutlineIcon fontSize="large" />
      <Typography sx={{ ...titleStyle }}>{text}</Typography>
    </Button>
  );
};
