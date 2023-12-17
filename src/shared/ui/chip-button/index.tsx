import { Chip } from '@mui/material';
import { style } from './style';
import './style.css';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface IChipButton {
  selectedLabels: Array<string>;
  setSelectedLabels: Dispatch<SetStateAction<Array<string>>>;
  label: string;
  onFilter: (value: 'search' | 'chips' | 'none') => void;
  filterBy: 'search' | 'chips' | 'none';
}

export const ChipButton: FC<IChipButton> = ({ ...props }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  function onClick() {
    setIsSelected((isSelected) => !isSelected);
    props.onFilter('chips');
    props.setSelectedLabels([...props.selectedLabels, props.label]);
    if (props.selectedLabels.includes(props.label)) {
      const arr = props.selectedLabels.filter(
        (el: string) => el !== props.label
      );
      props.setSelectedLabels(arr);
    } else {
      props.setSelectedLabels([...props.selectedLabels, props.label]);
    }
  }

  useEffect(() => {
    props.filterBy !== 'chips' && setIsSelected(false);
  }, [props.filterBy]);

  return (
    <Chip
      className={`${isSelected ? 'selected-chip' : ''}`}
      onClick={() => onClick()}
      variant="outlined"
      size="medium"
      sx={{ ...style }}
      label={props.label}
    />
  );
};
