import { FC } from 'react';
import { Box } from '@mui/material';
import labelPath from '~/shared/assets/friend.svg';
import { labelWrapperStyle } from './style';

export const FriendCardLabel: FC = () => {
  return (
    <Box
      component="img"
      sx={{
        ...labelWrapperStyle,
      }}
      src={labelPath}
    />
  );
};
