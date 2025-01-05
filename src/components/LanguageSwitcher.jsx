// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonGroup, Button } from '@mui/material';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

    // Direction handling is managed in App.js via useEffect
  };

  return (
    <ButtonGroup variant="text" color="inherit" sx={{ mr: 2 }}>
      <Button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>
        EN
      </Button>
      <Button onClick={() => changeLanguage('fa')} disabled={i18n.language === 'fa'}>
        FA
      </Button>
    </ButtonGroup>
  );
}

export default LanguageSwitcher;
