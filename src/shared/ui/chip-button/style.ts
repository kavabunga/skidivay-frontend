type SxProps = {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  color: string;
  borderRadius: string;
  borderColor: string;
  '&:hover': {
    borderColor: string;
    backgroundColor: string;
  };
  '&:active': {
    borderColor: string;
    backgroundColor: string;
  };
};

export const style: SxProps = {
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
};
