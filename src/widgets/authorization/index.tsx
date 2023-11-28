import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { SignInForm, SignUpForm } from '~/features';
import { RegistrationSuccessWidget } from '~/widgets';
import style from './style';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
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

  useEffect(() => {
    setCurrentTab(location.state.tab);
  }, [location.state.tab]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSuccessClose = () => {
    setCurrentTab(0);
    setRegistredEmail('');
  };

  return registredEmail ? (
    <RegistrationSuccessWidget
      email={registredEmail}
      onClose={handleSuccessClose}
    />
  ) : (
    <Container component="section" sx={style.authWidget}>
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
        <Typography component="h1" sx={style.authTitle}>
          Вход
        </Typography>
        <SignInForm />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <Typography component="h1" sx={style.authTitle}>
          Регистрация
        </Typography>
        <SignUpForm setRegistredEmail={setRegistredEmail} />
      </CustomTabPanel>
    </Container>
  );
};
