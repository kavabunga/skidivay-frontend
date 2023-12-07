import { Chip } from '@mui/material';
import { style } from './style';
import './style.css';
import { useState } from 'react';

export const ChipButton = ({ ...props }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  function onClick() {
    setIsSelected(!isSelected);
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
