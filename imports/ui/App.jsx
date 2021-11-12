import React, {useState} from 'react';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { CssBaseline, Zoom } from "@material-ui/core";
import GlobalStyles from "./globalStyles";
import { SnackbarProvider } from "notistack";


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
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Zoom}
        maxSnack={4}
        iconVariant={{
          success: " ✅ ",
          error: " ❌ ",
          warning: " ⚠️ ",
          info: " ℹ️ ",
        }}
        preventDuplicate
      >
        <GlobalStyles/>
        <CssBaseline/>
        <Routes toggleTheme={toggleTheme}/>
      </SnackbarProvider>
    </ThemeProvider>
  )
};
