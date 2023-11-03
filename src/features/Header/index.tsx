import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonMUI from '../../shared/ui/Button-mui';
import ButtonGroupMui from '~/shared/ui/button-group-mui';
import AppBarMUI from '~/shared/ui/app-bar-mui';
import Logo from '../../shared/ui/Logo';
import style from './style';
import { FC } from 'react';
import CloseButton from '~/shared/ui/close-button';

type HeaderProps = {
	user: {
		name: string;
	};
	isLoggedIn: boolean;
	type: 'auth' | 'standard';
};

const Header: FC<HeaderProps> = ({ user, isLoggedIn, type }) => {
	const theme = useTheme();
	const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<AppBarMUI
			sx={{
				...style.header,
				justifyContent: type === 'auth' ? 'center' : 'space-between',
			}}
			elevation={0}
			color="inherit"
			position="static"
		>
			<Logo type={type === 'standard' ? 'full' : 'image'} />
			{isMediumUp && type !== 'auth' && (
				<ButtonGroupMui>
					<ButtonMUI label="Мои карты" variant="text" color="primary" />
					<ButtonMUI label="Каталог" variant="text" color="primary" />
				</ButtonGroupMui>
			)}
			{type !== 'auth' && (
				<ButtonMUI
					label={isLoggedIn ? user.name : 'Войти'}
					variant="contained"
					color="primary"
				/>
			)}
			{type === 'auth' && <CloseButton sx={style.closeButton} />}
		</AppBarMUI>
	);
};

export default Header;
