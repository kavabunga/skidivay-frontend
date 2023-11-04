import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const CloseButton = ({ ...props }) => {
  return (
    <IconButton {...props}>
      <CloseIcon />
    </IconButton>
  );
};
