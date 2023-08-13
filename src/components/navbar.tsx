import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Overdue Payments App</Typography>
        <nav className="space-x-4 ml-4">
          <Link to="/">Payment Form</Link>
          <Link to="/history">History</Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
