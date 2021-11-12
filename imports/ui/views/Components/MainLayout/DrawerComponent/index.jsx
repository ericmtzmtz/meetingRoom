import React from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import {
  Drawer,
  Hidden,
  Box,
  Divider,
  Typography,
  Avatar,
  Button,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import VideocamIcon from '@material-ui/icons/Videocam';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FolderIcon from '@material-ui/icons/Folder';
import TodayIcon from '@material-ui/icons/Today';
import GroupIcon from '@material-ui/icons/Group';

import { ItemsDrawer } from './items';

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  mobileDrawer: {
    width: drawerWidth,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightBold
    },
    '& $icon': {
      color: theme.palette.primary.main
    },
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  onhover: {
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
}))

const items = [
  {
    href: '/dashboard',
    icon: HomeIcon,
    title: 'Dashboard',
    role: ['admin']
  },
  {
    href: '/index',
    icon: VideocamIcon,
    title: 'Meeting Room',
    role: ['admin', 'user']
  },
  {
    href: '/users',
    icon: GroupIcon,
    title: 'Usuarios',
    role: ['admin']
  }
];


export const DrawerComponent = ({mobileOpen, handleDrawerToggle}) => {
  const classes = useStyles();
  const theme = useTheme();

  const user = {
    avatar: '/img/avatar/avatar.png',
    jobTitle: 'Senior Developer',
    name: 'Eric Martinez'
  };

  let existRole = false;

  const content = (
    <div>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={NavLink}
          src={user.avatar}
          to="/"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        {/* AQUI VA EL RENDER DE ITEMS */}
        {items.map((item, i) => {
          return(
            item.role.map((role, i) => {
              existRole = false;
              // console.log(`${role} + ${Roles.userIsInRole(Meteor.user(), role)} + ${item.title}`);
              Roles.userIsInRole(Meteor.user(), role) ? existRole = true : null;
              return(
                existRole ? renderItem(i, item, handleDrawerToggle) : ''
              )
            })
          )
        })}
      </Box >
      <Divider />
      <Box p={2}>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          ¿Quieres saber más?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          visita mi github
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <Button
            color="primary"
            href="https://github.com/ericmtzmtz/"
            variant="contained"
          >
            Eric Martinez
          </Button>
        </Box>
      </Box>
    </div >
  )

  return (
    <React.Fragment>
      <Hidden lgUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.mobileDrawer,
          }}
          // ModalProps={{
          //   keepMounted: true, // Better open performance on mobile.
          // }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{
            paper: classes.desktopDrawer,
          }}
          variant="persistent"
          open
        >
          {content}
        </Drawer>
      </Hidden>
    </React.Fragment>
  )
}

function renderItem(i, item, handleDrawerToggle) {
  return <ItemsDrawer
    key={i}
    href={item.href}
    title={item.title}
    icon={item.icon}
    onClick={handleDrawerToggle}
  />;
}

