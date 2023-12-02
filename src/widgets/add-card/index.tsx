import { Stack, Typography } from '@mui/material';
import { AddCardForm } from '~/entities';
import { containerStyle, titleStyle, topButtonsStyle } from './style';
import { BackButton } from '~/features';

export const AddCardWidget = () => {
  return (
    <Stack component="section" sx={containerStyle}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={topButtonsStyle}
      >
        <BackButton />
      </Stack>
      <Typography component="h1" sx={titleStyle}>
        Добавить карту
      </Typography>
      <AddCardForm />
    </Stack>
  );
};
