'use strict';
module.exports = function(sequelize, DataTypes) {
  var Exercise = sequelize.define('Exercise', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Exercise;
};