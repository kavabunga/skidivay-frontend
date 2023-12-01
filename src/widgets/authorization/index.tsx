import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Tabs, Tab, Stack } from '@mui/material';
import {
  ResetPasswordForm,
  SignInForm,
  SignUpForm,
  BackButton,
} from '~/features';
import { RegistrationSuccessWidget } from '~/widgets';
import {
  widgetStyle,
  titleStyle,
  paragraphStyle,
  topButtonsStyle,
} from './style';

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

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleShowDefault = () => {
    setCurrentTab(0);
    setRegistredEmail('');
    setWidgetScreen('default');
  };

  const handleShowResetPassword = () => {
    setWidgetScreen('passwordReset');
  };

  const handleShowRegistrationSuccess = (data: string) => {
    setRegistredEmail(data);
    setWidgetScreen('registrationSuccess');
  };

  switch (widgetScreen) {
    case 'registrationSuccess':
      return (
        <RegistrationSuccessWidget
          email={registredEmail}
          onClose={handleShowDefault}
        />
      );
    case 'passwordReset':
      return (
        <Stack component="section" sx={widgetStyle} spacing={2.5} useFlexGap>
          <Stack direction="row" sx={topButtonsStyle}>
            <BackButton />
          </Stack>
          <Typography component="h1" sx={titleStyle}>
            Забыли пароль?
          </Typography>
          <Typography sx={paragraphStyle}>
            Введите email и последние четыре цифры номера, который был указан
            при регистрации.
          </Typography>
          <ResetPasswordForm handleSetEmail={handleShowRegistrationSuccess} />
        </Stack>
      );
    case 'default':
      return (
        <Stack component="section" sx={widgetStyle} spacing={2.5} useFlexGap>
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
            <Typography component="h1" sx={titleStyle}>
              Вход
            </Typography>
            <SignInForm onResetPassword={handleShowResetPassword} />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={1}>
            <Typography component="h1" sx={titleStyle}>
              Регистрация
            </Typography>
            <SignUpForm handleSetEmail={handleShowRegistrationSuccess} />
          </CustomTabPanel>
        </Stack>
      );
  }
};
