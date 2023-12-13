import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Stack, Button, IconButton } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { UserContext } from '~/app';
import {
  UserProfileForm,
  BackButton,
  BackButtonToUserProfile,
  SignOut,
  DeleteUser,
} from '~/features';
import {
  ResetPasswordRequestSuccessWidget,
  ChangePasswordWidget,
} from '~/widgets';
import { containerStyle, topButtonsStyle, buttonStyle } from './style';

export const UserProfileWidget = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [widgetScreen, setWidgetScreen] = useState('default');
  const [isEditActive, setIsEditActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setWidgetScreen(location?.state?.widgetScreen ?? 'default');
  }, [location.state]);

  const handleEditEnable = () => {
    setIsEditActive(true);
  };

  const handleEditDisable = () => {
    setIsEditActive(false);
  };

  const handleChangePassword = () => {
    setWidgetScreen('changePassword');
  };

  const handleShowPasswordResetSuccess = () => {
    setWidgetScreen('resetPasswordRequestSuccess');
  };

  const handleShowDeleteUserPopup = () => {
    setIsPopupOpen(true);
  };

  const handleHideDeleteUserPopup = () => {
    setIsPopupOpen(false);
  };

  switch (widgetScreen) {
    case 'changePassword':
      return (
        <ChangePasswordWidget
          onShowPasswordResetSuccess={handleShowPasswordResetSuccess}
        />
      );
    case 'resetPasswordRequestSuccess':
      return <ResetPasswordRequestSuccessWidget email={user?.email || ''} />;
    case 'default':
      return (
        <Stack component="section" sx={containerStyle}>
          {widgetScreen === 'default' ? (
            <BackButton />
          ) : (
            <BackButtonToUserProfile />
          )}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={topButtonsStyle}
          >
            <Typography component="h1" variant="h1">
              Профиль
            </Typography>
            {!isEditActive && (
              <IconButton onClick={handleEditEnable} sx={{ padding: 0 }}>
                <CreateOutlinedIcon />
              </IconButton>
            )}
          </Stack>

          <UserProfileForm
            isActive={isEditActive}
            onChangePassword={handleChangePassword}
            onEditDisable={handleEditDisable}
          />
          {!isEditActive && (
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              useFlexGap
              sx={{ paddingTop: '.75rem' }}
            >
              <SignOut element={Button} variant="contained" sx={buttonStyle}>
                Выйти из аккаунта
              </SignOut>
              <Button
                variant="outlined"
                sx={buttonStyle}
                onClick={handleShowDeleteUserPopup}
              >
                Удалить аккаунт
              </Button>
            </Stack>
          )}
          <DeleteUser open={isPopupOpen} onClose={handleHideDeleteUserPopup} />
        </Stack>
      );
  }
};
