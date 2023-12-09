import { Dialog } from '@mui/material';
import { FC, ReactNode } from 'react';
import { CloseButton } from '..';
import { closeButtonStyle, paperStyle } from './style';

export interface IPopupProps {
  children?: ReactNode;
  onClose: () => void;
  open: boolean;
  showCloseButton?: boolean;
}

export const Popup: FC<IPopupProps> = ({
  children,
  onClose,
  open,
  showCloseButton,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: paperStyle,
        elevation: 0,
      }}
    >
      {showCloseButton && (
        <CloseButton onClick={onClose} sx={closeButtonStyle} />
      )}
      {children}
    </Dialog>
  );
};
