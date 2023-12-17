import { Button } from '@mui/material';
import { buttonStyle } from './style';

export const OutlineButton = ({ ...props }) => {
  return <Button variant="outlined" sx={buttonStyle} {...props} />;
};
