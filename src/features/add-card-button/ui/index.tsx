import { FC } from 'react';
import { Button } from '@mui/material';

interface AddCardButton {
  text: string;
  onClick(): void;
}

export const AddCardButton: FC<AddCardButton> = ({ text, onClick }) => {
  function handleClick() {
    onClick();
  }

  return (
    <Button
      variant="outlined"
      sx={{
        width: '100%',
        aspectRatio: '1 / 0.63',
        color: 'surface.dark',
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.5',
        textTransform: 'none',
        borderColor: 'surface.main',
        borderRadius: '20px',
      }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};
