import * as React from 'react';
import { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

interface InfoBarProps {
  message: string;
  isError: boolean;
  isOpen: boolean;
}

export const InfoBar: FC<InfoBarProps> = ({ message, isError, isOpen }) => {
  const [open, setOpen] = React.useState(isOpen);

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
        key={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        {isError ? (
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{
              width: '100%',
              backgroundColor: 'error.main',
            }}
          >
            {message || 'Ошибка!'}
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
            {message || 'Все ок!'}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
