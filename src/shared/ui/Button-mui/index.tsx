import Button from '@mui/material/Button';

const ButtonMUI = ({ ...props }) => {
	return <Button {...props}>{props.label}</Button>;
};

export default ButtonMUI;
