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
interface ISearchLine {
  onSearch: (value: 'search' | 'chips' | 'none') => void;
  filterBy: 'search' | 'chips' | 'none';
}

export const SearchLine: FC<ISearchLine> = ({ onSearch, filterBy }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [optionValue, setOptionValue] = useState<string | null>('');
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
      value={optionValue}
      inputValue={inputValue}
      onChange={(_e, newValue) => onChange(_e, newValue)}
      onInputChange={(_e, newInputValue) => onInput(_e, newInputValue)}
      options={options && optionValue ? options.map((option) => option) : ['']}
      renderInput={(params) => <TextField {...params} placeholder="Поиск" />}
    />
  );
};
