import { FC, useState } from 'react';
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
import { useUser } from '~/shared/store';
import { useShallow } from 'zustand/react/shallow';
import notFoundImg from '~/shared/assets/not-found.svg';

export const UserCards: FC = () => {
  //NOTE: Using useShallow to check if cards have really changed (like between search inputs)
  const sortedCards = useUser(useShallow((state) => state.sortedCards));
  const [filterBy, setFilterBy] = useState<'search' | 'chips' | 'none'>('none');

  const handleSwitchFilterBy = (value: 'search' | 'chips' | 'none') => {
    setFilterBy(value);
  };

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
        <SearchLine onSearch={handleSwitchFilterBy} filterBy={filterBy} />
      </Stack>

      <SearchChips onFilter={handleSwitchFilterBy} filterBy={filterBy} />
      {sortedCards.length ? (
        <Stack spacing={2} useFlexGap sx={contentStackStyle}>
          <CardsList items={sortedCards} />
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
