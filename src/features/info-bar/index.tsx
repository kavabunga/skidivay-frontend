import { useEffect, FC, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import { MessagesContext } from '~/app';
import { ApiMessageTypes } from '~/shared/enums';
import { IMessageContext } from '~/shared';

interface ISnackType {
  severity: AlertColor;
  backgroundColor: string;
  defaultMessage: string;
}
interface ISnack {
  message: IMessageContext;
  type: ISnackType;
}

export const InfoBar: FC = () => {
  const { messages } = useContext(MessagesContext);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<ISnack>();

  useEffect(() => {
    if (messages[0]) {
      setSnack({ message: messages[0], type: snackTypeSelector(messages[0]) });
      setOpen(true);
    }
  }, [messages]);

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
    snack && (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={snack.type.severity}
          icon={false}
          sx={{
            width: '100%',
            backgroundColor: snack.type.backgroundColor,
          }}
        >
          {snack.message.message || snack.type.defaultMessage}
        </Alert>
      </Snackbar>
    )
  );
};
