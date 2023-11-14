import { FC } from 'react';
import { Card, IconButton } from '@mui/material';
import { cardStyle, iconButtonStyle, addIconStyle } from './styles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface PromoCardProps {
  item: {
    _id?: string;
    category?: string;
    shopName?: string | null;
    shopLogo?: string | null;
  };
  onCardClick(item: {
    _id?: string;
    category?: string;
    shopName?: string | null;
    shopLogo?: string | null;
  }): void;
  isLoggedIn: boolean;
}

export const PromoCard: FC<PromoCardProps> = ({
  item,
  onCardClick,
  isLoggedIn,
}) => {
  function handleClick() {
    onCardClick(item);
  }

  return (
    <Card
      raised={false}
      sx={{
        backgroundImage: `url(${item.shopLogo})`,
        ...cardStyle,
      }}
    >
      {isLoggedIn && (
        <IconButton onClick={handleClick} sx={{ ...iconButtonStyle }}>
          <AddCircleOutlineOutlinedIcon sx={{ ...addIconStyle }} />
        </IconButton>
      )}
    </Card>
  );
};
