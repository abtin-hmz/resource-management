// src/Navigation.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';

function Navigation({ isLoggedIn, currentUser }) {
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left-aligned buttons */}
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/resources">
            {t('resources')}
          </Button>
          {isLoggedIn && currentUser?.role === 'admin' && (
            <Button color="inherit" component={Link} to="/admin">
              {t('adminDashboard')}
            </Button>
          )}
          {isLoggedIn&&  currentUser?.role === 'user' && (
            <Button color="inherit" component={Link} to="/my-requests">
              My Requests
            </Button>
          )}
        </Box>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Right-aligned buttons */}
        {isLoggedIn ? (
          <Button color="inherit" component={Link} to="/logout">
            {t('logout')}
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              {t('login')}
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              {t('signUp')}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
