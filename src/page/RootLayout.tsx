import { Container, Stack } from '@mui/system';
import { Outlet } from 'react-router-dom';
import Header from '~/features/Header';
import { AppFooter } from '~/shared/ui/app-footer';

export const RootLayout = () => (
	<>
		<Stack
			direction={'column'}
			height={'100vh'}
			justifyContent={'space-between'}
		>
			<Header isLoggedIn={false} user={{ name: 'test' }} />
			<Container sx={{ margin: '2rem auto' }}>
				<Outlet />
			</Container>
			<AppFooter />
		</Stack>
	</>
);
