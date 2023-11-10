import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { backButtonStyle } from './style';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="text"
      color="surface"
      startIcon={<ArrowBackIosOutlinedIcon />}
      sx={backButtonStyle}
    >
      Назад
    </Button>
  );
};
