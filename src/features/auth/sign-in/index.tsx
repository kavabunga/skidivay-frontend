import { Link, List, ListItem } from '@mui/material';
import AuthForm from '~/entities/form';

const SignInForm = () => {
	const fields = [
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			defaultHelperText: '',
			autoComplete: 'email',
			required: true,
			placeholder: '',
		},
		{
			name: 'password',
			label: 'Пароль',
			type: 'password',
			defaultHelperText: '',
			autoComplete: 'current-password',
			required: true,
			placeholder: '',
		},
	];

	return (
		<AuthForm fields={fields} button={{ label: 'Войти', isFullWidth: true }}>
			<List sx={{ fontSize: '12px', fontWeight: 300 }}>
				<ListItem dense disableGutters>
					<Link>Забыли пароль?</Link>
				</ListItem>
				<ListItem dense disableGutters>
					<Link>Нужна помощь?</Link>
				</ListItem>
			</List>
		</AuthForm>
	);
};

export default SignInForm;
