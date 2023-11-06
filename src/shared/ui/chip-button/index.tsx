import { Chip } from '@mui/material';

export const ChipButton = ({ ...props }) => {
  return (
    <Chip
      variant="outlined"
      size="medium"
      sx={{
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.25rem',
        color: 'surface.dark',
        borderRadius: '0.5rem',
        borderColor: 'surface.main',
        '&:hover': {
          borderColor: 'surface.main',
          backgroundColor: '#6750A414',
        },
        '&:active': {
          borderColor: 'surface.main',
          backgroundColor: '#6750A41F',
        },
      }}
      {...props}
    />
  );
};
