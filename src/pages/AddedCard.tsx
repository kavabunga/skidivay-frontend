import { FC } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  Typography,
} from '@mui/material';
import { AppFooter } from '~/shared/ui';
import { Header } from '~/widgets/header';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CreateIcon from '@mui/icons-material/Create';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Barcode from 'react-barcode';

interface AddedCardProps {
  title: string;
  cardNumber: string;
  barcodeNumber: number | string;
}

export const AddedCard: FC<AddedCardProps> = ({
  title,
  cardNumber,
  barcodeNumber,
}) => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header user={{ name: 'иван' }} isLoggedIn={true} type="standard" />
      <Box
        component="div"
        sx={{
          minWidth: '20.5rem',
          margin: 0,
          padding: '1.5rem 0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          alignSelf: 'center',
        }}
      >
        {/* Нужно менять на линк из React-Router */}
        <a
          href="#"
          style={{
            position: 'absolute',
            fontSize: '0.75rem',
            color: '#737981',
            textDecoration: 'none',
            top: '.3rem',
            left: '.75rem',
          }}
        >
          Назад
        </a>
        <Typography sx={{ fontSize: '2rem' }}>{title}</Typography>
        <IconButton sx={{ padding: 0 }}>
          <CreateIcon />
        </IconButton>
      </Box>
      <Box sx={{ alignSelf: 'center' }}>
        <Box
          sx={{
            border: '1px solid rgb(73, 69, 78)',
            width: '20.5rem',
            height: '14rem',
            borderRadius: '1.25rem',
            position: 'relative',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: 0,
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          padding: '1.5rem 0 0',
          minWidth: '20.5rem',
          position: 'relative',
        }}
      >
        <Input
          sx={{
            border: '1px solid rgb(73, 69, 78)',
            borderRadius: '.25rem',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          defaultValue={cardNumber}
          disabled={true}
        ></Input>
        <Typography
          sx={{
            position: 'absolute',
            color: '#49454F',
            fontSize: '0.75rem',
            top: '1rem',
            left: '1rem',
            backgroundColor: '#fff',
            padding: '0 .25rem',
          }}
        >
          Номер карты
        </Typography>
        <IconButton
          sx={{ padding: 0, position: 'absolute', right: '1rem', top: '50%' }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          padding: '1.5rem 0 0',
          minWidth: '20.5rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Тут не номер карты наверное будет, а её штрихкод */}
        <Barcode value={cardNumber} />
      </Box>
      <Box
        sx={{
          padding: '1.5rem 0 0',
          minWidth: '20.5rem',
          position: 'relative',
        }}
      >
        <Input
          sx={{
            border: '1px solid rgb(73, 69, 78)',
            borderRadius: '.25rem',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          disabled={true}
          defaultValue={barcodeNumber}
        ></Input>
        <Typography
          sx={{
            position: 'absolute',
            color: '#49454F',
            fontSize: '0.75rem',
            top: '1rem',
            left: '1rem',
            backgroundColor: '#fff',
            padding: '0 .25rem',
          }}
        >
          Номер штрихкода
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 0 2.5rem',
          rowGap: '.5rem',
        }}
      >
        <Button
          variant="contained"
          sx={{
            fontSize: '0.875rem',
            minWidth: '20.5rem',
            padding: '1.125rem 0',
            textTransform: 'none',
          }}
        >
          Поделиться картой
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: '0.875rem',
            minWidth: '20.5rem',
            padding: '1.125rem 0',
            textTransform: 'none',
          }}
        >
          Удалить карту
        </Button>
      </Box>
      <AppFooter></AppFooter>
    </Container>
  );
};
