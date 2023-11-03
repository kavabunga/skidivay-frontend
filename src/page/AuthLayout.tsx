import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '~/features/Header';
import { AppFooter } from '~/shared/ui/app-footer';

export const AuthLayout = () => {
	//TODO: Temporary values
	const user: { name: string } = { name: '' };
	const isLoggedIn: boolean = false;

	return (
		<Box component="main">
			<Header user={user} isLoggedIn={isLoggedIn} type="auth" />
			<Outlet />
			<AppFooter />
		</Box>
	);
};
