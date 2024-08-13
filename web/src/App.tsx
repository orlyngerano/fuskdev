import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from './features/navigation';

function App() {
  const theme = useTheme();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginRight: theme.spacing(1) }}
          >
            Alpha Centauri System
          </Typography>
          <img className="Logo" src="/alpha.svg" />
        </Toolbar>
      </AppBar>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
