import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { SearchChips } from '~/features';
import { CardsList } from '~/widgets';
import { mainContainerStyle, linkStyle } from './styles';

type UserCardsProps = {
  tags: {
    label: string;
  }[];
  logOut(): void;
};

export const UserCards: FC<UserCardsProps> = ({ tags, logOut }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('..', { relative: 'path' });
    logOut();
  };

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
      <Button
        variant="text"
        onClick={handleClick}
        children={'Выйти из аккаунта'}
        sx={{ ...linkStyle }}
      />
    </Container>
  );
};
