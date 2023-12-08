import { FC, useContext } from 'react';
import { SortedCardsContext } from '~/app/contexts';
import { Box, Stack, Typography } from '@mui/material';
import { SearchChips } from '~/features';
import { CardsList } from '~/widgets';
import {
  mainContainerStyle,
  contentStackStyle,
  paragraphStyle,
  noResultsStackStyle,
} from './styles';
import { SearchLine } from '~/features/search-line/ui';
import notFoundImg from '~/shared/assets/not-found.jpg';

export const UserCards: FC = () => {
  const { cards } = useContext(SortedCardsContext);
  return (
    <Stack component="main" useFlexGap spacing={2} sx={mainContainerStyle}>
      <Stack spacing={2} useFlexGap sx={contentStackStyle}>
        <Typography
          component="h1"
          variant="h2"
          sx={{
            width: '100%',
          }}
        >
          Мои карты
        </Typography>
        <SearchLine />
      </Stack>

      <SearchChips />
      {cards.length ? (
        <Stack spacing={2} useFlexGap sx={contentStackStyle}>
          <CardsList items={cards || []} />
        </Stack>
      ) : (
        <Stack spacing={2} useFlexGap sx={noResultsStackStyle}>
          <Typography textAlign="center" sx={paragraphStyle}>
            По вашему запросу не найдено подходящих магазинов
          </Typography>
          <Box component="img" src={notFoundImg} alt="Ничего не найдено" />
        </Stack>
      )}
    </Stack>
  );
};
