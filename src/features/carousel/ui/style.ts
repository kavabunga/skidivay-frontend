import { SxProps } from '@mui/material';

export const ulStyle: SxProps = {
  display: 'flex',
  width: '100%',
  maxWidth: '100%',
  padding: '0',
  flexFlow: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  gap: '1rem',
  listStyle: 'none',
  overflow: 'hidden',
};

export const liStyle: SxProps = {
  display: 'flex',
  width: '100%',
  maxWidth: '100%',
  flexFlow: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  gap: '1rem',
  flexShrink: '0',
};

export const wrapCardstyle: SxProps = {
  display: 'block',
  width: 'calc((100% - 1rem)/2)',
  aspectRatio: '1 / 0.63',
  flexShrink: '0',
};
