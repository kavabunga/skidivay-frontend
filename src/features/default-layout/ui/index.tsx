import React from 'react';
import Container from '@mui/material/Container';

interface DefaultLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const DefaultLayout = ({ header, children }: DefaultLayoutProps) => {
  return (
    <>
      <Container>
        {header}
        {children}
      </Container>
    </>
  );
};
