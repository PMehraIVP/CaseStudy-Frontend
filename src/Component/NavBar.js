import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#36454F' }}>
        <Toolbar>
          <Button color="inherit" component={NavLink} to="/" >
            Equity
          </Button>
          <Button color="inherit" component={NavLink} to="/bond" >
            Bonds
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
