import { Chip } from '@mui/material';
import { style } from './style';

export const ChipButton = ({ ...props }) => {
  return <Chip variant="outlined" size="medium" sx={{ ...style }} {...props} />;
};
