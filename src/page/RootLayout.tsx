import { Outlet } from 'react-router-dom';

export const RootLayout = () => (
	<div>
		<div>header</div>
		<Outlet />
	</div>
);
