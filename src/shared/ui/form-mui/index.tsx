import { Box } from '@mui/material';

const FormMui = ({ ...props }) => {
	return <Box component="form" noValidate {...props} />;
};

export default FormMui;
