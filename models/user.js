'use strict';
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set (val) {
        this.setDataValue('passwordDigest', val);
      },
      get () {
        return this.get('passwordDigest');
      }
    },
    passwordDigest: DataTypes.STRING
  }, {
    classMethods: {
      associate: function ({Log, Exercise, Profile}) {
        User.hasOne(Profile);
        User.hasMany(Log);
        User.belongsToMany(Exercise, {through: Log});
      }
    }
  });
  return User;
};
