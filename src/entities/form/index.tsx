import { useForm, SubmitHandler } from 'react-hook-form';
import FormMui from '~/shared/ui/form-mui';
import InputMUI from '~/shared/ui/input-mui';
import ButtonMUI from '~/shared/ui/Button-mui';
import style from './style';
import { FC, ReactNode } from 'react';

type Field = {
	name: string;
	label: string;
	type: string;
	autoComplete?: string;
	defaultHelperText?: string;
	placeholder?: string;
	required: boolean;
};

const AuthForm: FC<{
	fields: Field[];
	children?: ReactNode | ReactNode[];
	button: { label: string; isFullWidth: boolean; width?: number };
}> = ({ fields, children, button }) => {
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
			{children && children}
			<ButtonMUI
				type="submit"
				variant="contained"
				disabled={!isDirty || !isValid}
				{...button}
				fullwidth={button.isFullWidth}
				sx={{ width: `${button.width}px` }}
			/>
		</FormMui>
	);
};

export default AuthForm;
