import { Container, Typography } from '@mui/material';
import SignInForm from '~/features/auth/sign-in';

export const Signin = () => {
	return (
		<Container
			component="section"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '30px',
			}}
		>
			<Typography
				align="center"
				component="h1"
				sx={{
					fontSize: '18px',
					fontWeight: 700,
					paddingY: '30px',
				}}
			>
				Вход
			</Typography>
			<SignInForm />
		</Container>
	);
};
