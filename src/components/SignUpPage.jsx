import React from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function SignUpPage({ onSignUp }) {
  const { t } = useTranslation();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Here you can add validation or sign-up logic
    onSignUp(); // Update the isLoggedIn state in App.js
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        {t('signUp')}
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          label={t('username')}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label={t('email')}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label={t('password')}
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label={t('confirmPassword')}
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {t('signUp')}
        </Button>
      </form>
    </Container>
  );
}

export default SignUpPage;
