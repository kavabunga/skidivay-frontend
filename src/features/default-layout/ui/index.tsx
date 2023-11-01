import React from 'react';
import Container from '@mui/material/Container';

interface DefaultLayoutProps {
	header: React.ReactNode;
	content: React.ReactNode;
}

const DefaultLayout = ({ header, content }: DefaultLayoutProps) => {
	return (
		<>
			<Container>
				{header}
				{content}
			</Container>
		</>
	);
};

export default DefaultLayout;
