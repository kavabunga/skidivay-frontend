import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import { FC } from 'react';
import { IPopupProps, Popup } from '~/shared';
import { titleStyle, itemStyle, textStyle } from './style';

interface ICardSharePopupProps extends IPopupProps {
  cardId: number;
}

export const CardSharePopup: FC<ICardSharePopupProps> = ({
  open,
  onClose,
  cardId,
  children,
}) => {
  console.log(cardId);
  return (
    <Popup open={open} onClose={onClose} showCloseButton={true}>
      <DialogTitle sx={titleStyle}>Поделиться картой</DialogTitle>
      <DialogContent sx={itemStyle}>
        <DialogContentText sx={textStyle}>
          Введите Email пользователя, с которым хотите поделиться картой
        </DialogContentText>
      </DialogContent>
      <Stack useFlexGap>
        {/* Here goes the form */}
        {children}
      </Stack>
    </Popup>
  );
};
