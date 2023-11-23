import React from 'react';
import { FC, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MessageContext } from '~/app';
import { Type } from '~/shared/enums';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

interface InfoBarProps {
  isOpen: boolean;
}

export const InfoBar: FC<InfoBarProps> = ({ isOpen }) => {
  const { message } = useContext(MessageContext);
  const [open, setOpen] = useState(isOpen);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="Закрыть сообщение"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        key={message.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        {message.type === Type.error ? (
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{
              width: '100%',
              backgroundColor: 'error.main',
            }}
          >
            {message.message || 'Ошибка!'}
          </Alert>
        ) : message.type === Type.info ? (
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{
              width: '100%',
              backgroundColor: 'info.main',
            }}
          >
            {message.message || 'Все ок!'}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{
              width: '100%',
              backgroundColor: 'secondary.main',
            }}
          >
            {message.message || 'Успех!'}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
