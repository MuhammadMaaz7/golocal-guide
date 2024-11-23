import React from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            GoLocal Guide
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;