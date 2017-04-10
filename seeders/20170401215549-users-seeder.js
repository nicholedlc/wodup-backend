'use strict';
const {User} = require('../models/index');

module.exports = {
  up: function () {
    return User.create(
      {firstName: 'Nichole', lastName: 'De La Cruz', email: 'ndlc@gmail.com', password: 'yeah', passwordDigest: 'yeah'},
      {firstName: 'Cheesus', lastName: 'Crust', email: 'cheesus.crust@gmail.com', password: 'yeah', passwordDigest: 'yeah'}
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
