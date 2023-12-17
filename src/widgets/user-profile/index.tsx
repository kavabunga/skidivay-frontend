import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Stack, Button, IconButton } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import {
  UserProfileForm,
  BackButton,
  BackButtonToUserProfile,
  SignOut,
  DeleteUser,
  ReactivateEmail,
} from '~/features';
import {
  ResetPasswordRequestSuccessWidget,
  ChangePasswordWidget,
  ReactivationSuccessWidget,
} from '~/widgets';
import { containerStyle, topButtonsStyle, buttonStyle } from './style';
import { useUser } from '~/shared/store/useUser';

export const UserProfileWidget = () => {
  const location = useLocation();
  const user = useUser((state) => state.user);
  const [widgetScreen, setWidgetScreen] = useState('default');
  const [isEditActive, setIsEditActive] = useState(false);
  const [isByeByePopupOpen, setIsByeByePopupOpen] = useState(false);
  const [isActivateEmailPopupOpen, setIsActivateEmailPopupOpen] =
    useState(false);

  useEffect(() => {
    setWidgetScreen(location?.state?.widgetScreen ?? 'default');
  }, [location.state]);

  const handleEditEnable = () => {
    setIsEditActive(true);
  };

  const handleEditDisable = () => {
    setIsEditActive(false);
  };

  const handleShowDefault = () => {
    setWidgetScreen('default');
  };

  const handleChangePassword = () => {
    setWidgetScreen('changePassword');
  };

  const handleShowPasswordResetSuccess = () => {
    setWidgetScreen('resetPasswordRequestSuccess');
  };

  const handleShowReactivationSuccess = () => {
    handleHideActivateEmailPopup();
    setWidgetScreen('reactivationSuccess');
  };

  const handleShowDeleteUserPopup = () => {
    setIsByeByePopupOpen(true);
  };

  const handleHideDeleteUserPopup = () => {
    setIsByeByePopupOpen(false);
  };

  const handleShowActivateEmailPopup = () => {
    setIsActivateEmailPopupOpen(true);
  };

  const handleHideActivateEmailPopup = () => {
    setIsActivateEmailPopupOpen(false);
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
    case 'reactivationSuccess':
      return <ReactivationSuccessWidget onClose={handleShowDefault} />;
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
            onActivateEmail={handleShowActivateEmailPopup}
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
          <DeleteUser
            open={isByeByePopupOpen}
            onClose={handleHideDeleteUserPopup}
          />
          <ReactivateEmail
            open={isActivateEmailPopupOpen}
            onClose={handleHideActivateEmailPopup}
            afterSubmit={handleShowReactivationSuccess}
          />
        </Stack>
      );
  }
};
