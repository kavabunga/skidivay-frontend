import { Box } from '@mui/material';
import { ChipButton } from '~/shared/ui';
import { chipsLabels } from '~/shared/mock/chips-labels';
import { style } from './style';

export const SearchChips = ({ items = chipsLabels }) => {
  return (
    <Box sx={{ ...style }}>
      {items.map((item) => {
        return <ChipButton key={item.label} label={item.label} />;
      })}
    </Box>
  );
};
