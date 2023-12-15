import { Button } from '@mui/material';
import PermIdentityOutlined from '@mui/icons-material/PermIdentityOutlined';
import { style } from './style';

export const AccountButton = () => {
  return (
    <Button
      variant="outlined"
      aria-label="Кнопка входа в личный кабинет"
      sx={{ ...style }}
    >
      <PermIdentityOutlined fontSize="medium" />
    </Button>
  );
};
