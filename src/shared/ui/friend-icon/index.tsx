import { Box } from '@mui/material';
import shareIconPath from '~/shared/assets/shared.svg';
import { labelWrapperStyle } from './style';

export const FriendIcon = () => {
  return (
    <Box component="img" src={shareIconPath} sx={{ ...labelWrapperStyle }} />
  );
};
