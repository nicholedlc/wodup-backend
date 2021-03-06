"use strict";
const { User, Exercise } = require("../models/index");
const moment = require("moment");

module.exports = {
  up: function() {
    // promise all, get all the exercises, and users
    // then will have all exercises and users resolved
    // iterate over the exercises and create a bunch of Logs
    return Promise.all([Exercise.findAll(), User.findOne()]).then(
      ([exercises, user]) =>
        Promise.all(
          exercises.map(e =>
            Promise.all(
              Array.from({ length: 20 }).map((x, i) =>
                e.createLog({
                  UserId: user.id,
                  rep: Math.floor(Math.random() * 10 + 1),
                  set: Math.floor(Math.random() * 5 + 1),
                  weight: Math.floor(Math.random() * 40 + 40),
                  date: moment()
                    .subtract(20 - i, "days")
                    .toDate()
                })
              )
            )
          )
        )
    );
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logs", null, {});
  }
};
