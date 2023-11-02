import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonMUI from '../../shared/ui/Button-mui';
import ButtonGroupMui from '~/shared/ui/button-group-mui';
import AppBarMUI from '~/shared/ui/app-bar-mui';
import Logo from '../../shared/ui/Logo';
import style from './style';
import { FC } from 'react';

type HeaderProps = {
	user: {
		name: string;
	};
	isLoggedIn: boolean;
};

const Header: FC<HeaderProps> = ({ user, isLoggedIn }) => {
	const theme = useTheme();
	const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<AppBarMUI sx={style.header} color="inherit" position="static">
			<Logo />
			{isMediumUp && (
				<ButtonGroupMui>
					<ButtonMUI label="Мои карты" variant="text" color="primary" />
					<ButtonMUI label="Каталог" variant="text" color="primary" />
				</ButtonGroupMui>
			)}

			<ButtonMUI
				label={isLoggedIn ? user.name : 'Войти'}
				variant="contained"
				color="primary"
			/>
		</AppBarMUI>
	);
};

export default Header;
