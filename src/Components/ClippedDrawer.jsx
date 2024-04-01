import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../images/Logo.png';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Person2Icon from '@mui/icons-material/Person2';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link, NavLink } from 'react-router-dom';
import AccountMenu from './AccountMenu';


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>

      <div className="dashboard-image">
        <img src={Logo} alt="" className='img-fluid' />
      </div>
      <div className="m mt-3 mb-5">
        <p className='m-logo '>M</p>
        <p className='ps-3'>Meta Logix</p>
      </div>
      <Divider />
      <List>
        {[
          <NavLink activeClassName='is-active' to="/dashboard">Dashboard</NavLink>,
          <Link to="/customer">Customer</Link>,
          <Link to="/supportTickets">Support Tickets(17)</Link>,
          <Link to="transactions">Transactions</Link>
        ].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={index === 0 ? "/dashboard" : (index === 1 ? "/customer" : (index === 2 ? "/supportTickets" : "/transactions"))}>
              <ListItemIcon>
                {index === 0 ?
                  <SpaceDashboardIcon /> : (index === 1 ?
                    <Person2Icon /> : (index === 2 ?
                      <SupportAgentIcon /> :
                      <AccountBalanceIcon />
                    )
                  )
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>

        ))}
      </List>
      <Divider />
    </div>
  );

  

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <AppBar

        sx={{
          backgroundColor: "transparent",
          boxShadow: "none"
        }}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}

          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}


ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
