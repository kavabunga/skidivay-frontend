import { FC, useContext } from 'react';
import { Card, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { UserContext } from '~/app';
import { IShop } from '~/shared';
import {
  interactiveCardStyle,
  nonInteractiveCardStyle,
  iconButtonStyle,
  addIconStyle,
} from './styles';

interface PromoCardProps {
  item: IShop;
}

export const PromoCard: FC<PromoCardProps> = ({ item }) => {
  const { user } = useContext(UserContext);

  function handleClick() {
    return item;
  }

  return (
    <Card
      elevation={0}
      sx={
        user
          ? {
              backgroundImage: `url(${item.logo})`,
              ...interactiveCardStyle,
            }
          : {
              backgroundImage: `url(${item.logo})`,
              ...nonInteractiveCardStyle,
            }
      }
    >
      {user && (
        <IconButton onClick={handleClick} sx={{ ...iconButtonStyle }}>
          <AddCircleOutlineOutlinedIcon sx={{ ...addIconStyle }} />
        </IconButton>
      )}
    </Card>
  );
};
