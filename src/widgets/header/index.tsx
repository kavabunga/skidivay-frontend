import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, AppBar, ButtonGroup, Button } from '@mui/material';
import { Logo, CloseButton } from '~/shared/ui';
import style from './style';

type HeaderProps = {
  user: {
    name: string;
  };
  isLoggedIn: boolean;
  type: 'minimal' | 'standard';
};

//INFO: 'minimal' for logo only, like on authorization screen, 'standard' for full featured header

export const Header: FC<HeaderProps> = ({ user, isLoggedIn, type }) => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

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
      {isMediumUp && type !== 'minimal' && (
        <ButtonGroup>
          <Button variant="text" color="primary">
            Мои карты
          </Button>
          <Button variant="text" color="primary">
            Каталог
          </Button>
        </ButtonGroup>
      )}
      {type !== 'minimal' && (
        <Button variant="contained" color="primary">
          {isLoggedIn ? user.name : 'Войти'}
        </Button>
      )}
      {type === 'minimal' && <CloseButton sx={style.closeButton} />}
    </AppBar>
  );
};
