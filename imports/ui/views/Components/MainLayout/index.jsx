import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";

import { makeStyles } from '@material-ui/core/styles';

import { Appbar } from './Appbar'
import { DrawerComponent } from './DrawerComponent';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  },
}));

export const MainLayout = ({toggleLogin, toggleTheme, mode}) => {
  const [notifications] = useState([1, 2, 3, 4]);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  var Icon = mode !== 'dark' ? Brightness7Icon : Brightness3Icon;

  
  return (
      <div className={classes.root}>
        <Appbar
          handleDrawerToggle={handleDrawerToggle}
          Icon={Icon}
          toggleTheme={toggleTheme}
          // toggleLogin={toggleLogin}
          notifications={notifications}
        />
        <DrawerComponent mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
  );
}
