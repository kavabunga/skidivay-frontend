import { Button } from '@mui/material';
import PermIdentityOutlined from '@mui/icons-material/PermIdentityOutlined';
import { style } from './style';

export const AccountButton = ({ ...props }) => {
  return (
    <Button
      variant="outlined"
      aria-label="account icon"
      sx={{ ...style }}
      {...props}
    >
      <PermIdentityOutlined fontSize="medium" />
    </Button>
  );
};
