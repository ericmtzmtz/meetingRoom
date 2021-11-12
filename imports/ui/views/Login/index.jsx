import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Paper,
  CssBaseline,
  Typography,
  TextField,
  Box,
  Link,
  InputAdornment,
  LinearProgress,
  makeStyles
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  progress: {
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  image: {
    backgroundImage: 'url(img/logo.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: "#FFFFFF",
    // backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = () => {
  const [user, setUser] = useState(null);
  const [password, setPass] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const classes = useStyles();


  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    user !== null && password !== null && user !== '' && password !== '' ?
      Meteor.loginWithPassword(user, password, error => {
        if (error) {
          enqueueSnackbar(
            // Aqui pondriamos este mensaje solo para debug pero en mi opinion es un vector de ataque
            //error.message
            //por eso ponemos un mensaje generico
            'Ocurrio un error verifica los datos!'
            , {variant: 'error'})
          setLoading(false)
        } else {
          enqueueSnackbar(`Bienvenido ${Meteor.user().profile.name}`, { variant: 'success' })
          setLoading(false)
        }
      })
      :
      null;
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesion
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              onChange={e => setUser(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary"/>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={e => setPass(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Contraseña"
              name="password"
              autoComplete="current-password"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyRoundedIcon color="primary"/>
                  </InputAdornment>
                )
              }}
            />
            {loading ? 
              <LinearProgress /> :
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Entrar
              </Button>
            }
            <Box mt={5}>
              <Typography variant="body2" align="center">
                {'Copyright © E. Mtz'}
                <Link color="inherit" href="/">
                  <br />Sistema de Gestion de salas de reunion<br/>
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
