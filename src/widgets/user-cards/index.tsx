import { FC, useContext } from 'react';
import { CardsContext } from '~/app/contexts';
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
  const { cards } = useContext(CardsContext);

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
      <CardsList items={cards || []} />
      <SignOut
        element={Button}
        variant="text"
        children={'Выйти из аккаунта'}
        sx={{ ...linkStyle }}
      />
    </Container>
  );
};
