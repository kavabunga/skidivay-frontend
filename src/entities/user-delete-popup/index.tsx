import {
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { FC, useState } from 'react';
import { IPopupProps, Popup } from '~/shared';
import { titleStyle, itemStyle, textStyle, buttonStyle } from './style';

export const UserDeletePopup: FC<IPopupProps> = ({
  open,
  onClose,
  children,
}) => {
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const handleDeleteConfirm = () => {
    setIsDeleteConfirmed(true);
  };
  const handleClose = () => {
    onClose();
    setIsDeleteConfirmed(false);
  };
  return (
    <Popup open={open} onClose={handleClose} showCloseButton={true}>
      <DialogTitle sx={titleStyle}>Вы уверены?</DialogTitle>
      <DialogContent sx={itemStyle}>
        <DialogContentText sx={textStyle}>
          Наша общение было особенным и приносило радость...
        </DialogContentText>
      </DialogContent>
      {isDeleteConfirmed && <DialogTitle sx={titleStyle}>Точно?</DialogTitle>}
      {isDeleteConfirmed && (
        <DialogContent sx={itemStyle}>
          <DialogContentText sx={textStyle}>
            Введите свой пароль, чтобы мы поверили, что это вы
          </DialogContentText>
        </DialogContent>
      )}

      {!isDeleteConfirmed ? (
        <Stack useFlexGap spacing={1}>
          <AccentButton onClick={onClose}>Ладно, остаюсь</AccentButton>
          <Button variant="text" sx={buttonStyle} onClick={handleDeleteConfirm}>
            Да, все кончено
          </Button>
        </Stack>
      ) : (
        children
      )}
    </Popup>
  );
};
