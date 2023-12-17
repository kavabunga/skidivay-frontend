import { useEffect, useState, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Tabs, Tab, Stack } from '@mui/material';
import { SignInForm, SignUpForm } from '~/features';
import {
  RegistrationSuccessWidget,
  ResetPasswordRequestSuccessWidget,
  ChangeEmailWidget,
  PasswordResetRequestWidget,
} from '~/widgets';
import { widgetStyle, titleTabStyle } from './style';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Stack
      spacing={2.5}
      useFlexGap
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Stack>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AuthWidget = () => {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const [registredEmail, setRegistredEmail] = useState('');
  const [widgetScreen, setWidgetScreen] = useState('default');

  useEffect(() => {
    setCurrentTab(location?.state?.tab ?? 0);
  }, [location.state]);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleShowChangeEmail = () => {
    setWidgetScreen('changeEmail');
  };

  const handleShowRegistrationSuccess = () => {
    setWidgetScreen('registrationSuccess');
  };

  const handleShowPasswordResetSuccess = (data: string) => {
    setRegistredEmail(data);
    setWidgetScreen('resetPasswordRequestSuccess');
  };

  const handleShowResetPassword = () => {
    setWidgetScreen('passwordReset');
  };

  switch (widgetScreen) {
    case 'registrationSuccess':
      return (
        <RegistrationSuccessWidget
          handleShowChangeEmail={handleShowChangeEmail}
        />
      );
    case 'resetPasswordRequestSuccess':
      return <ResetPasswordRequestSuccessWidget email={registredEmail} />;
    case 'passwordReset':
      return (
        <PasswordResetRequestWidget
          handleSetEmail={handleShowPasswordResetSuccess}
        />
      );
    case 'changeEmail':
      return (
        <ChangeEmailWidget
          handleShowRegistrationSuccess={handleShowRegistrationSuccess}
        />
      );
    case 'default':
      return (
        <Stack component="section" sx={widgetStyle} useFlexGap>
          <Box>
            <Tabs
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              value={currentTab}
              onChange={handleChange}
              aria-label="Вкладки логина и регистрации"
            >
              <Tab label="Войти" {...a11yProps(0)} />
              <Tab label="Регистрация" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={currentTab} index={0}>
            <Typography component="h1" sx={titleTabStyle}>
              Вход
            </Typography>
            <SignInForm onResetPassword={handleShowResetPassword} />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={1}>
            <Typography component="h1" sx={titleTabStyle}>
              Регистрация
            </Typography>
            <SignUpForm
              handleShowRegistrationSuccess={handleShowRegistrationSuccess}
            />
          </CustomTabPanel>
        </Stack>
      );
  }
};
