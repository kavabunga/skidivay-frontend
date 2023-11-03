import { useForm, SubmitHandler } from 'react-hook-form';
import FormMui from '~/shared/ui/form-mui';
import InputMUI from '~/shared/ui/input-mui';
import ButtonMUI from '~/shared/ui/Button-mui';
import style from './style';
import { FC } from 'react';

type Field = {
	name: string;
	label: string;
	type: string;
	autoComplete?: string;
	defaultHelperText?: string;
	placeholder?: string;
	required: boolean;
};

const AuthForm: FC<{ fields: Field[] }> = ({ fields }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<{ [key: string]: string }>({
		mode: 'onBlur',
	});
	const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) =>
		console.log(data);

	return (
		<FormMui
			sx={style}
			autoComplete="on"
			name="signUp"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			{fields[0] &&
				fields.map((field) => (
					<InputMUI
						key={field.name}
						label={field.label}
						placeholder={field.placeholder}
						type={field.type}
						helperText={
							errors[field.name]
								? errors[field.name]?.type
								: field.defaultHelperText
						}
						error={!!errors[field.name]}
						autoComplete={field.autoComplete}
						inputProps={{
							...register(field.name, { required: field.required }),
						}}
						variant="outlined"
						size="small"
						fullWidth
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

export default AuthForm;
