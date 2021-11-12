import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import Page from '../Components/Page';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
  button: {
    marginTop: 50,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
}));

export const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="404"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404: Lo que estas buscando <br /> no se encuentra aqui
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Talvez fue un error o quizas no :O<br />
            Le dio amsiedad a la pagina ...<br />
            Usa la navegacion para volver al inicio<br />
            o pulsa el boton de abajo...
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/img/page_not_found.svg"
            />
          </Box>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<KeyboardBackspaceIcon />}
              className={classes.button}
              component={Link}
              to="/"
            >
              Regresar
            </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

