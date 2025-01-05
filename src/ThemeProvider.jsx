// src/ThemeProvider.jsx
import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const ThemeProvider = ({ children, direction }) => {
  // Create a theme instance with the specified direction
  const theme = createTheme({
    direction: direction,
    // You can customize your theme here
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  // Create a cache with rtl plugin if direction is 'rtl'
  const cacheRtl = createCache({
    key: direction === 'rtl' ? 'muirtl' : 'mui',
    stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
