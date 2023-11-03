import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
	<div>
		<div>header</div>
		<Outlet />
	</div>
);
