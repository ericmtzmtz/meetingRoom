import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  Toolbar,
  IconButton,
  Fade,
  Menu,
  MenuItem,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbar: {
    height: 64,
    color: theme.palette.common,
    backgroundColor: theme.palette.background.main
  },
  menu: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.type !== 'dark' ? '#fff' : '',
    }
  },
}));


export const Appbar = ({ handleDrawerToggle, Icon, toggleTheme, notifications }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const classes = useStyles();

  let { from } = location.state || { from: { pathname: '/login' } };

  const handleClick = (e) => {
    setOpenMenu(e.currentTarget);
  }

  const handleCloseMenu = () => {
    setOpenMenu(null);
  }

  const handleLogout = () => {
    Meteor.logout();
    <Navigate to={from} />
  }
  
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Hidden mdDown>
          <Link to="/">
            <img
              alt="Logo"
              src="/img/logo.png"
              height="230"
            />
          </Link>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Box flexGrow={1} />
        <IconButton onClick={toggleTheme}>
          <Icon />
        </IconButton>
        <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color='secondary'
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleClick}>
          <InputIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={openMenu}
          keepMounted
          open={Boolean(openMenu)}
          onClose={handleCloseMenu}
          TransitionComponent={Fade}
        >
          <MenuItem className={classes.menu} onClick={handleCloseMenu}>
            <PersonIcon />
            Perfil
          </MenuItem>
          <MenuItem className={classes.menu} onClick={handleCloseMenu}>
            <AccountCircleIcon />
            Mi cuenta
          </MenuItem>
          <MenuItem className={classes.menu} onClick={handleLogout}>
            <ExitToAppIcon />
            Cerrar Sesion
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
