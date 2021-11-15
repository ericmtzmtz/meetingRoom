import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useRoutes, Navigate } from 'react-router-dom';
import {
  NotFoundView,
  MainLayout,
  Main,
  Login,
  Calendar,
} from './views'



/** 
* Generamos la instancia que gestiona las rutas de la aplicacion
* @param {String} toggleTheme - Almacena el estado del tema.
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/ 
export const Routes = ({toggleTheme}) => {
  const { user, isLoggedIn } = useTracker(() => {
    const user = Meteor.user()
    const userId = Meteor.userId()
    const isLoggingIn = Meteor.loggingIn()
    return {
      user,
      userId,
      isLoggingIn,
      isLoggedIn: !!userId
    }
  }, [])

  const routes = [
    {
      path: '/',
      element: isLoggedIn ? (
        <MainLayout
          toggleTheme={toggleTheme}
        />
      ) : (<Navigate to="login" />),
      children: [
        {path: '404', element: <NotFoundView />},
        {path: '*', element: <Navigate to="404" />},
        {path: '/index', element: <Main />},
        {path: '/', element: <Navigate to="index" />},
        {path: '/dashboard', element: <Calendar />},
        
      ]
    },
    {
      path: "login",
      element: !isLoggedIn ? (
        <Login />
      ) : (
        <Navigate to="/" />
      ),
      children: [{ path: "*", element: <Navigate to="404" /> }],
    },
  ]

  return useRoutes(routes);
}
