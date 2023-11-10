import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, IconButton, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CreateIcon from '@mui/icons-material/Create';
import { BackButton } from '~/features';
import { EditCardForm } from '~/entities';
import { buttonStyle, topButtonsStyle } from './style';

//NOTE: name, shopName, shopLogo are disabled for debugging while no logic applied
interface CardWidgetProps {
  name?: string;
  cardNumber: string;
  barcodeNumber: number | string;
  shopName?: string | null;
  shopLogo?: string | null;
}

export const CardWidget: FC<CardWidgetProps> = ({
  // name,
  cardNumber = '1111 1383 0039 3838 49994',
  barcodeNumber = '113839895849854',
  // shopName,
  // shopLogo,
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
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton onClick={handleEditToggle} sx={{ padding: 0.5 }}>
            <CreateIcon />
          </IconButton>
        </Stack>
      </Stack>
      {/* //NOTE: Place for Card component */}
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
