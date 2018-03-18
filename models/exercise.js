"use strict";
module.exports = function(sequelize, DataTypes) {
  var Exercise = sequelize.define(
    "Exercise",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      classMethods: {
        associate: function({ Log, User }) {
          Exercise.hasMany(Log, { as: "logs" });
          Exercise.belongsToMany(User, { through: "Log" });
        }
      }
    }
  );
  return Exercise;
};
