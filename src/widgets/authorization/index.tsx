import { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { SignInForm, SignUpForm } from '~/features';
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
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container component="section" sx={style.authWidget}>
      <Box>
        <Tabs
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Вкладки логина и регистрации"
        >
          <Tab label="Войти" {...a11yProps(0)} />
          <Tab label="Регистрация" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography component="h1" sx={style.authTitle}>
          Вход
        </Typography>
        <SignInForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography component="h1" sx={style.authTitle}>
          Регистрация
        </Typography>
        <SignUpForm />
      </CustomTabPanel>
    </Container>
  );
};
