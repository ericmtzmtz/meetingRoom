import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Importamos metodos
import '/imports/startup/server';

// Importamos publications
import '/imports/api/Users/publications'

var users = [
  { name: "Usuario", email: "user@mail.com", roles: ['user'] },
  { name: "Admin", email: "admin@mail.com", roles: ['admin'] },
];

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    users.forEach(function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: "2LyzLLBxwf75geM",
        profile: { name: user.name }
      });

      if (Meteor.roleAssignment.find({ 'user._id': id }).count() === 0) {
        user.roles.forEach(function (role) {
          Roles.createRole(role, { unlessExists: true });
        });
        // Need _id of existing user record so this call must come after `Accounts.createUser`.
        Roles.addUsersToRoles(id, user.roles);
      }

    });
  }
});
