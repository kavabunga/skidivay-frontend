import { Button } from '@mui/material';
import PermIdentityOutlined from '@mui/icons-material/PermIdentityOutlined';

export const AccountButton = ({ ...props }) => {
  return (
    <Button
      variant="outlined"
      aria-label="account icon"
      sx={{
        padding: '0.75rem',
        color: 'primary.main',
        fontSize: '1rem',
        borderSize: '1px',
        borderStyle: 'solid',
        borderColor: 'surface.main',
        borderRadius: '0.5rem',
      }}
      {...props}
    >
      <PermIdentityOutlined fontSize="medium" />
    </Button>
  );
};
