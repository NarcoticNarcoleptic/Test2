import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const CompactNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          My Compact Navbar
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CompactNavbar;
