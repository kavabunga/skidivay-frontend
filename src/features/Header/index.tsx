import ButtonMUI from '../../shared/ui/Button-mui';
import Logo from '../../shared/ui/Logo';
import './Header.css';

const Header = () => {
	return (
		<header className="header">
			<Logo />
			<ButtonMUI label="Войти" variant="contained" color="primary" />
		</header>
	);
};

export default Header;
