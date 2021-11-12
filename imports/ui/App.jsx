import React, {useState} from 'react';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import GlobalStyles from "./globalStyles";
import { Routes } from './routes';

import Theme from './views/Components/Theme';

export const App = () => {
  let mode = localStorage.getItem("theme");
  const [myTheme, setMyTheme] = useState(createTheme(Theme(mode)));

  const toggleTheme = () => {
    mode !== "dark" ? (mode = "dark") : (mode = "light");
    let theme = Theme(mode);
    localStorage.setItem("theme", mode);
    setMyTheme(createTheme(theme));
  };

  return (
    <ThemeProvider theme={myTheme}>
      <GlobalStyles/>
      <CssBaseline/>
      <Routes toggleTheme={toggleTheme}/>
    </ThemeProvider>
  )
};
