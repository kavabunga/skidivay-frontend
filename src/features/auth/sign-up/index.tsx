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

type Field = {
	name: keyof Inputs;
	label: string;
	type: string;
	autoComplete?: string;
	defaultHelperText?: string;
	placeholder?: string;
	required: boolean;
};

const SignUpForm = () => {
	const fields: Field[] = [
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

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onBlur',
	});
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<FormMui
			sx={style}
			autoComplete="on"
			name="signUp"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			{fields[0] &&
				fields.map((input) => (
					<InputMUI
						key={input.name}
						label={input.label}
						placeholder={input.placeholder}
						variant="outlined"
						type={input.type}
						helperText={
							errors[input.name]
								? errors[input.name]?.type
								: input.defaultHelperText
						}
						error={!!errors[input.name]}
						autoComplete={input.autoComplete}
						fullWidth
						size="small"
						inputProps={{
							...register(input.name, { required: input.required }),
						}}
					/>
				))}

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
