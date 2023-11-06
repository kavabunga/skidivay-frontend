import { Box } from '@mui/material';
import { ChipButton } from '~/shared/ui';

export const SearchChips = ({ items = defaultItems }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: 'auto',
        margin: 0,
        padding: 0,
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem 0.75rem',
      }}
    >
      {items.map((item) => {
        return <ChipButton key={item.label} label={item.label} />;
      })}
    </Box>
  );
};

const defaultItems: { label: string }[] = [
  { label: 'Все' },
  { label: 'Избранное' },
  { label: 'Продукты' },
  { label: 'Аптеки' },
  { label: 'Оптика' },
  { label: 'Одежда и обувь' },
  { label: 'Косметика и парфюмерия' },
  { label: 'Спорт' },
  { label: 'Товары для дома' },
  { label: 'Канцелярия' },
  { label: 'Бытовая техника' },
  { label: 'Строительные товары' },
  { label: 'Развлечения' },
  { label: 'Другое' },
];
