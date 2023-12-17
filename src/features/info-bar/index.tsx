import { useEffect, FC, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import { ApiMessageTypes } from '~/shared/enums';
import { IMessageContext } from '~/shared';
import { useMessages } from '~/shared/store';
import { useShallow } from 'zustand/react/shallow';

interface ISnackType {
  severity: AlertColor;
  backgroundColor: string;
  defaultMessage: string;
}

export const InfoBar: FC = () => {
  const messages = useMessages(useShallow((state) => state.messages));
  const setLastShown = useMessages((state) => state.setLastShown);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (messages?.[0]?.message && !messages?.[0]?.isShown) {
      setLastShown();
      setOpen(true);
    }
  }, [messages, setLastShown]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const snackTypeSelector = (data: IMessageContext): ISnackType => {
    let severity: AlertColor, backgroundColor, defaultMessage;
    switch (data.type) {
      case ApiMessageTypes.error:
        severity = 'error';
        backgroundColor = 'surface.dark';
        defaultMessage = 'Ошибка!';
        break;
      case ApiMessageTypes.success:
        severity = 'success';
        backgroundColor = 'surface.dark';
        defaultMessage = 'Успех!';
        break;
      default:
        severity = 'info';
        backgroundColor = 'surface.dark';
        defaultMessage = '';
        break;
    }
    return { severity, backgroundColor, defaultMessage };
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={messages?.[0] && snackTypeSelector(messages[0]).severity}
        icon={false}
        sx={{
          width: '100%',
          backgroundColor:
            messages?.[0] && snackTypeSelector(messages[0]).backgroundColor,
        }}
      >
        {messages?.[0]?.message}
      </Alert>
    </Snackbar>
  );
};
