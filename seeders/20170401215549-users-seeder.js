'use strict';
const {User} = require('../models/index')

module.exports = {
  up: function () {
    return User.create({firstName: 'Cheesus', lastName: 'Crust', email: 'cheesus.crust@gmail.com', passwordDigest: 'yeah'})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
