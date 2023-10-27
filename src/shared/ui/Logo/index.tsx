import logoPath from '../../assets/logo.svg';
import './Logo.css';

const Logo = () => {
	return (
		<div className="logo">
			<img className="logo__image" alt="Логотип проекта" src={logoPath} />
			<p className="logo__title">Скидывай</p>
		</div>
	);
};

export default Logo;
