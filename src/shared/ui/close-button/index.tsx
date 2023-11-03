import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({ ...props }) => {
	return (
		<IconButton {...props}>
			<CloseIcon />
		</IconButton>
	);
};

export default CloseButton;
