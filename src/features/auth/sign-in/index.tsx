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
	return <AuthForm fields={fields} />;
};

export default SignInForm;
