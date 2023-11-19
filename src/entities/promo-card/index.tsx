import { FC, useContext } from 'react';
import { UserContext } from '~/app';
import { IShop } from '~/shared';
import { Card, IconButton } from '@mui/material';
import { cardStyle, iconButtonStyle, addIconStyle } from './styles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

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
      raised={false}
      sx={{
        backgroundImage: `url(${item.logo})`,
        ...cardStyle,
      }}
    >
      {user && (
        <IconButton onClick={handleClick} sx={{ ...iconButtonStyle }}>
          <AddCircleOutlineOutlinedIcon sx={{ ...addIconStyle }} />
        </IconButton>
      )}
    </Card>
  );
};
