import AuthForm from '~/entities/form';

const SignUpForm = () => {
	const fields = [
		{
			name: 'name',
			label: 'Имя',
			type: 'text',
			defaultHelperText: 'Как к вам обращаться?',
			autoComplete: 'name',
			required: true,
			placeholder: '',
		},
		{
			name: 'phone',
			label: 'Телефон',
			type: 'tel',
			defaultHelperText: '',
			autoComplete: 'tel',
			required: true,
			placeholder: '+7 (999) 999-99-99',
		},
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
			autoComplete: 'new-password',
			required: true,
			placeholder: '',
		},
		{
			name: 'passwordRepeat',
			label: 'Пароль',
			type: 'passwordRepeat',
			defaultHelperText: '',
			autoComplete: 'new-password',
			required: true,
			placeholder: '',
		},
	];
	return (
		<AuthForm fields={fields} button={{ label: 'Далее', isFullWidth: true }} />
	);
};

export default SignUpForm;
