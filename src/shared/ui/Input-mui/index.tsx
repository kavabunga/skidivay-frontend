import { FC } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

interface InputMUIProps {
	isEnabled: boolean;
	error: boolean;
	name: string;
	label: string;
	startAdornment: boolean;
}

const InputMUI: FC<InputMUIProps> = ({ isEnabled, label, ...props }) => {
	return (
		<div>
			<InputLabel htmlFor="input-with-icon-adornment">{label}</InputLabel>
			<TextField disabled={!isEnabled} {...props}></TextField>
		</div>
	);
};

export default InputMUI;
