import { colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

/** @constant {Objecto} */
/** Solo redefinimos los colores ya que los default no me gustan mucho */
const customBlueGray = {
  50: '#f0f4f8',
  100: '#D9E2EC',
  200: '#BCCCDC',
  300: '#9FB3C8',
  400: '#829AB1',
  500: '#627D98',
  // 600: '#486581',
  600: '#405A72',
  700: '#334E68',
  800: '#243B53',
  900: '#102A43',
  A100: '#a7ffeb',
  A200: '#64ffda',
  A400: '#1de9b6',
  A700: '#00bfa5',
  background: '#1a2128'
}

/** @constant {Objecto} */
const customBlueGreen = {
  200: '#b4d8b4',
  500: '#2acbb9',
}
/** 
* Solo una funcion que gestiona el tema (colores, sombras, fuentes).
* @param {String} mode - Toma el modo del tema selecionado por el usuario.
* @return {Object} Configuracion del tema
*/

const Theme = (mode) => {
  let theme;

  mode === 'dark' ?
    theme = {
      palette: {
        type: 'dark',
        background: {
          default: customBlueGray['background'],
          paper: customBlueGray[600],
          main: customBlueGray[700],
        },
        common: '#fff',
        primary: {
          main: customBlueGreen[200],
        },
        secondary: {
          main: customBlueGreen[500],
        },
      },
      shadows,
      typography
    } :
    theme = {
      palette: {
        background: {
          default: '#e3f1fc',
          main: colors.blue['A100'],
        },
        common: '#000',
        primary: {
          main: colors.blue[500],
          contrastText: '#fff'
        },
        secondary: {
          main: colors.pink[600],
        },
        error: {
          main: colors.red[900]
        }
      },
      shadows,
      typography
    }

  return theme
}

// const theme = {
//   palette: {
//     type: 'light',
//     background: {
//       default: colors.blueGrey[900],
//       paper: colors.grey[800]
//     },
//     common: {
//       black: '#000',
//       white: '#fff'
//     },
//     primary: {
//       main: colors.teal[500],
//       dark: colors.teal[900],
//       light: '#33ab9f'
//     },
//     secondary: {
//       main: colors.blueGrey[500],
//       dark: colors.blueGrey[900],
//       light: '#7f97a2'
//     },
//   },
//   shadows,
//   typography
// }

export default Theme;
