import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import { FC } from 'react';
import { IPopupProps, Popup } from '~/shared';
import { titleStyle, itemStyle, textStyle } from './style';

export const CardSharePopup: FC<IPopupProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Popup open={open} onClose={onClose} showCloseButton={true}>
      <DialogTitle sx={titleStyle}>Поделиться картой</DialogTitle>
      <DialogContent sx={itemStyle}>
        <DialogContentText sx={textStyle}>
          Введите Email пользователя, с которым хотите поделиться картой
        </DialogContentText>
      </DialogContent>
      <Stack useFlexGap>{children}</Stack>
    </Popup>
  );
};
