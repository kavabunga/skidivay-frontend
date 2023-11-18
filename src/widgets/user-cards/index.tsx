import { FC } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { SearchChips, SignOut } from '~/features';
import { CardsList } from '~/widgets';
import { mainContainerStyle, linkStyle } from './styles';

type UserCardsProps = {
  tags: {
    label: string;
  }[];
};

export const UserCards: FC<UserCardsProps> = ({ tags }) => {
  return (
    <Container component="main" sx={{ ...mainContainerStyle }}>
      <Typography
        component="h1"
        variant="h1"
        textAlign="left"
        sx={{
          width: '100%',
        }}
      >
        {`Мои карты`}
      </Typography>
      <SearchChips items={tags} />
      <CardsList />
      <SignOut
        element={Button}
        variant="text"
        children={'Выйти из аккаунта'}
        sx={{ ...linkStyle }}
      />
    </Container>
  );
};
