import { Button } from '@mui/material';
import { style } from './style';

export const AccentButton = ({ ...props }) => {
  return <Button variant="contained" sx={{ ...style }} {...props} />;
};
