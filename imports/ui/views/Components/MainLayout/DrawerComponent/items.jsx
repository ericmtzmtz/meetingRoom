import React from 'react';
import { 
  NavLink, 
  useMatch,
  useResolvedPath } from 'react-router-dom';
import {
  ListItem,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
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
}))

export const ItemsDrawer = ({className, href, icon: Icon, title, ...rest}) => {
  const classes = useStyles();
  let resolved = useResolvedPath(href);
  let match = useMatch({ path: resolved.pathname, end: true });
  
  return (
    <ListItem
      className={classes.item}
      disableGutters
      {...rest}
      >
      <Button
        className={match ? classes.active : classes.button}
        component={NavLink}
        to={href}
      >
        {Icon && (
          <Icon
            className={classes.icon}
            size="20"
            color="primary"
          />
        )}
        <span className={classes.title}>
          {title}
        </span>
      </Button>
    </ListItem>
  )
}