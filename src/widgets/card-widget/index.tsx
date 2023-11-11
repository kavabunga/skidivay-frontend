import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, IconButton, Stack, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import { BackButton } from '~/features';
import { CardFull, EditCardForm } from '~/entities';
import { CardProps } from '~/shared/types';
import { buttonStyle, topButtonsStyle } from './style';

//NOTE: name, shopName, shopLogo are disabled for debugging while no logic applied
interface CardWidgetProps extends CardProps {
  toggleLike?: () => void;
}

export const CardWidget: FC<CardWidgetProps> = ({
  name = 'Мой магазин',
  cardNumber = '1111 1383 0039 3838 49994',
  barcodeNumber = '113839895849854',
  // shopName,
  shopLogo = '',
  isLiked = false,
}) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const handleEditToggle = () => {
    setIsEditActive(() => !isEditActive);
  };

  //NOTE: Getting card Id from react-router
  console.log(useParams().id);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={topButtonsStyle}
      >
        <BackButton />
        <Stack direction="row">
          <IconButton sx={{ padding: 0.5 }}>
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={handleEditToggle} sx={{ padding: 0.5 }}>
            <CreateIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Box
        sx={{
          paddingY: 1.5,
        }}
      >
        <CardFull
          name={name}
          cardNumber={cardNumber}
          barcodeNumber={barcodeNumber}
          shopLogo={shopLogo ? shopLogo : ''}
          isLiked={isLiked}
        />
      </Box>

      <EditCardForm
        isActive={isEditActive}
        cardNumberValue={cardNumber}
        barcodeValue={barcodeNumber.toString()}
      />
      <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap>
        <Button variant="contained" sx={buttonStyle}>
          Поделиться картой
        </Button>
        <Button variant="outlined" sx={buttonStyle}>
          Удалить карту
        </Button>
      </Stack>
    </Container>
  );
};
