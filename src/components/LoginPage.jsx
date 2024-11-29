import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function LoginPage({ onLogin }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      onLogin(email, password); // Pass email and password to the onLogin callback
    } catch (err) {
      setError(t(err.message || 'invalidCredentials')); // Handle error from onLogin
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        {t('login')}
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label={t('email')}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={t('password')}
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {t('login')}
        </Button>
      </form>
    </Container>
  );
}

export default LoginPage;
