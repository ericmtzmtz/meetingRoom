import React from 'react'
import Page from '../Components/Page';
import Calendar from './Components/Calendar'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Paper,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  title: {
    color: theme.palette.primary.main
  }
}))

export const Main = () => {
  const classes = useStyles()

  return (
    <Page title="Agendar Sala" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item lg>
          <Paper className={classes.root}>
            <Calendar />
          </Paper>
        </Grid>
      </Grid>
    </Page>
  )
}
