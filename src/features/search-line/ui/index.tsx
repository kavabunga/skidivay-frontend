import { Autocomplete, TextField } from '@mui/material';
import {
  useEffect,
  useState,
  SyntheticEvent,
  BaseSyntheticEvent,
  FC,
} from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useUser } from '~/shared/store/useUser';
import { searchLineStyle } from './style';
interface ISearchLine {
  onSearch: (value: 'search' | 'chips' | 'none') => void;
  filterBy: 'search' | 'chips' | 'none';
}

export const SearchLine: FC<ISearchLine> = ({ onSearch, filterBy }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [optionValue, setOptionValue] = useState<string | null>('');
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const searchCards = useUser((state) => state.searchCards);
  const setSortedCards = useUser((state) => state.setSortedCards);
  const cards = useUser(useShallow((state) => state.cards));

  function onChange(_e: SyntheticEvent, newValue: string | null) {
    onSearch('search');
    // const input = e.currentTarget.textContent;
    if (newValue) {
      searchCards(newValue);
    } else {
      setSortedCards(cards);
    }
    setOptionValue(newValue);
  }

  function onInput(_e: BaseSyntheticEvent, newInputValue: string) {
    onSearch('search');
    setInputValue(newInputValue);
    setOptionValue(newInputValue);
    newInputValue ? searchCards(newInputValue) : setSortedCards(cards);
  }

  useEffect(() => {
    const optionsArray: string[] = [];
    cards.forEach((card) => {
      if (card.card.shop) {
        if (!optionsArray.includes(card.card.shop.name)) {
          optionsArray.push(card.card.shop.name);
        }
      }
    });
    setOptions(optionsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    optionValue && searchCards(optionValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  useEffect(() => {
    if (filterBy !== 'search') {
      setOptionValue(null);
      setInputValue('');
    }
  }, [filterBy]);

  return (
    <Autocomplete
      freeSolo
      fullWidth
      noOptionsText=""
      open={open}
      onClose={() => setOpen(false)}
      value={optionValue}
      inputValue={inputValue}
      onChange={(_e, newValue) => onChange(_e, newValue)}
      onInputChange={(_e, newInputValue) => {
        onInput(_e, newInputValue);
        if (newInputValue.length === 0) {
          open && setOpen(false);
        } else {
          !open && setOpen(true);
        }
      }}
      options={options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Поиск"
          variant="filled"
          sx={{ ...searchLineStyle }}
        />
      )}
    />
  );
};
