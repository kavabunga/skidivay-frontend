import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import { FC } from 'react';
import { IPopupProps, Popup } from '~/shared';
import { titleStyle, itemStyle, textStyle } from './style';

export const ActivateEmailPopup: FC<IPopupProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Popup open={open} onClose={onClose} showCloseButton={true}>
      <DialogTitle sx={titleStyle}>Подвердить Email?</DialogTitle>
      <DialogContent sx={itemStyle}>
        <DialogContentText sx={textStyle}>
          Введите Email, чтобы мы отправили письмо с подтверждением
        </DialogContentText>
      </DialogContent>
      <Stack useFlexGap>{children}</Stack>
    </Popup>
  );
};
