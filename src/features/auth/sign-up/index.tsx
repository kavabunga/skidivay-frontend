import { useForm, SubmitHandler } from 'react-hook-form';
import FormMui from '~/shared/ui/form-mui';
import InputMUI from '~/shared/ui/input-mui';
import ButtonMUI from '~/shared/ui/Button-mui';
import style from './style';

type Inputs = {
	name: string;
	phone: string;
	email: string;
	password: string;
	passwordRepeat: string;
};

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onBlur',
	});
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<FormMui
			sx={style}
			autocomplete="on"
			name="signUp"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<InputMUI
				label="Имя"
				value={watch('name')}
				variant="outlined"
				type="text"
				helperText={errors.name ? errors.name.type : 'Как к вам обращаться?'}
				autoComplete="name"
				fullWidth
				size="small"
				error={!!errors.name}
				inputProps={{ ...register('name', { required: true }) }}
			/>
			<InputMUI
				label="Телефон"
				value={watch('phone')}
				placeholder="+7 (999) 999-99-99"
				variant="outlined"
				type="tel"
				helperText={errors.phone && errors.phone.type}
				error={!!errors.phone}
				autoComplete="tel"
				fullWidth
				size="small"
				inputProps={{ ...register('phone', { required: true }) }}
			/>
			<InputMUI
				label="Email"
				value={watch('email')}
				variant="outlined"
				type="email"
				helperText={errors.email && errors.email.type}
				error={!!errors.email}
				autoComplete="email"
				fullWidth
				size="small"
				inputProps={{ ...register('email', { required: true }) }}
			/>
			<InputMUI
				label="Пароль"
				value={watch('password')}
				variant="outlined"
				type="password"
				helperText={errors.password && errors.password.type}
				error={!!errors.password}
				autoComplete="new-password"
				fullWidth
				size="small"
				inputProps={{ ...register('password', { required: true }) }}
			/>
			<InputMUI
				label="Подтверждение пароля"
				value={watch('passwordRepeat')}
				variant="outlined"
				type="password"
				helperText={errors.passwordRepeat && errors.passwordRepeat.type}
				error={!!errors.passwordRepeat}
				autoComplete="new-password"
				fullWidth
				size="small"
				inputProps={{ ...register('passwordRepeat', { required: true }) }}
			/>
			<ButtonMUI
				label="Далее"
				variant="contained"
				type="submit"
				disabled={!isDirty || !isValid}
			/>
		</FormMui>
	);
};

export default SignUpForm;
