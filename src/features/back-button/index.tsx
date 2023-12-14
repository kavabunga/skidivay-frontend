import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { backButtonStyle, iconStyle } from './style';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="text"
      startIcon={<ArrowBackIosOutlinedIcon sx={iconStyle} />}
      sx={backButtonStyle}
    >
      Назад
    </Button>
  );
};
