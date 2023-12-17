import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { IShop } from '~/shared';
import {
  interactiveCardStyle,
  nonInteractiveCardStyle,
  iconButtonStyle,
  addIconStyle,
} from './styles';
import { useUser } from '~/shared/store/useUser';

interface PromoCardProps {
  item: IShop;
}

export const PromoCard: FC<PromoCardProps> = ({ item }) => {
  const user = useUser((state) => state.user);
  const navigate = useNavigate();

  function handleClick() {
    navigate('/card/new', { relative: 'path', state: { shop: item } });
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
