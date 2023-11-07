type SxProps = {
  display: string;
  width: string;
  height: string;
  margin: string;
  padding: string;
  flexFlow: string;
  justifyContent: string;
  alignItems: string;
  gap: string;
};

export const style: SxProps = {
  display: 'flex',
  width: '100%',
  height: 'auto',
  margin: '0',
  padding: '0',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.5rem 0.75rem',
};
