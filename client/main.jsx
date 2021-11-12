import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { HashRouter } from 'react-router-dom';


Meteor.startup(() => {
  render(
  // Usamos HashRouter por si queremos agregar una mobil app despues
  <HashRouter>
    <App/>
  </HashRouter>
  , document.getElementById('react-target'));
});
