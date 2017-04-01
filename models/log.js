'use strict';
module.exports = function(sequelize, DataTypes) {
  var Log = sequelize.define('Log', {
    UserId: DataTypes.INTEGER,
    ExerciseId: DataTypes.INTEGER,
    rep: DataTypes.INTEGER,
    set: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    note: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function({User, Exercise}) {
        Log.belongsTo(User);
        Log.belongsTo(Exercise);
      }
    }
  });
  return Log;
};
