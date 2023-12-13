import {
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import { FC } from 'react';
import { IPopupProps, Popup } from '~/shared';
import { titleStyle, itemStyle, textStyle, buttonStyle } from './style';

export const UserDeletePopup: FC<IPopupProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Popup open={open} onClose={onClose} showCloseButton={true}>
      <DialogTitle sx={titleStyle}>Вы уверены?</DialogTitle>
      <DialogContent sx={itemStyle}>
        <DialogContentText sx={textStyle}>
          Наша общение было особенным и приносило радость...
        </DialogContentText>
      </DialogContent>
      <Stack useFlexGap spacing={1}>
        <Button variant="contained" sx={buttonStyle} onClick={onClose}>
          Передумал, остаюсь
        </Button>
        {children}
      </Stack>
    </Popup>
  );
};
