'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    passwordDigest: DataTypes.STRING
  }, {
    classMethods: {
      associate: function({Log, Exercise}) {
        User.hasMany(Log);
        User.belongsToMany(Exercise, {through: Log});
      }
    }
  });
  return User;
};
