"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn("Logs", "imageUrl", Sequelize.STRING);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Logs", "imageUrl");
  }
};
