import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, IconButton } from '@mui/material';
import { Logo, CloseButton } from '~/shared/ui';
import { PermIdentity } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import style from './style';
import { UserContext } from '~/app';

//INFO: 'minimal' for logo only, like on authorization screen, 'standard' for full featured header
export type HeaderProps = {
  type: 'minimal' | 'standard';
};

export const Header: FC<HeaderProps> = ({ type }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        ...style.header,
        justifyContent: type === 'minimal' ? 'center' : 'space-between',
      }}
      elevation={0}
      color="inherit"
      position="static"
    >
      <Logo type={type === 'standard' ? 'full' : 'image'} />
      {type === 'standard' &&
        (user ? (
          <IconButton
            onClick={() => navigate('/user')}
            color="primary"
            size="small"
            sx={style.iconButton}
          >
            <PermIdentity />
          </IconButton>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="outlined"
            color="primary"
            sx={{ border: '#7A757F 1px solid' }}
            state={{ tab: 0 }}
          >
            Войти
          </Button>
        ))}
      {type === 'minimal' && (
        <CloseButton sx={style.closeButton} component={Link} to="/" />
      )}
    </AppBar>
  );
};
