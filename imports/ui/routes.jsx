import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useRoutes, Navigate } from 'react-router-dom';
/** 
* Generamos la instancia que gestiona las rutas de la aplicacion
* @param {String} toggleTheme - Almacena el estado del tema.
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/ 
export const Routes = ({toggleTheme}) => {
  console.log('Load Routes')

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
      element: isLoggedIn ? console.log('Logged in') : console.log('No logged in')
    },
    {
      path: "login",
      element: !isLoggedIn ? (
        console.log('Loggin View')
      ) : (
        <Navigate to="/" />
      ),
      children: [{ path: "*", element: <Navigate to="404" /> }],
    },
  ]

  return useRoutes(routes);
}
