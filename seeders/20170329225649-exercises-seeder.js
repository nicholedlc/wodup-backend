'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Exercises',
                                     [...DISTANCE, ...WEIGHTS, ...BODYWEIGHT].map(
                                       e => Object.assign(e, {createdAt: new Date(), updatedAt: new Date()})
                                     ),
                                     {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Exercises', null, {});
  }
};

const DISTANCE = [
   { name: `Running`, description: `Typically distances ranges from 100 meters to one mile.  Also common are shuttle runs back and forth between marks 10 -15 meters apart.` },
   { name: `Rowing`, description: `Many workouts include rowing machine distances from 500 meters to 2000 meters, or rowing for a set calorie burn.`}
 ]

 const WEIGHTS = [
   { name: `Deadlift`, description: `Barbell is lifted from the ground until you reach and upright standing position.`},
   { name: `Clean`, description:  `Barbell or Dumbbell is lifted from the ground to a “rack position” in front of ones neck.  You end the movement in a standing position.  In a squat clean, you receive the bar in a squatting position and stand to finish the lift.  In a power-clean you receive the bar in a partial squat and again finish in a standing position.`},
   { name: `Kettlebell Swing`, description:  `A kettlebell is swung from between the legs to overhead` },
   { name: `Press`, description:  `Barbell is moved from the “rack position” directly in front of ones neck to overhead.`},
   { name: `Snatch`, description: `Barbell, Kettlebell, or Dumbbell is raised from the floor to overhead in one seamless motion.`},
   { name: `Squat`, description:  `Barbell is supported on upper back (back squat), rack position (front squat), or overhead arms locked out (overhead squat).  From a standing position you lower ones self to slightly below parallel (hips below knees) and then drive the weight back up to the starting position.`},
   { name: `Sumo Deadlift High Pull`, description: `With a wide stance a barbell, med-ball, kettlebell or dumbbell is lifted from the ground to a position just under the chin.`},
   { name: `Thruster`, description:  `A combination of a front squat and a push press.  Starting with the barbell in the rack position, you perform a front squat and then stand driving the weight overhead to a press position.`},
   { name: `Tire Flip`, description:  `A large tire, lying on its side is flipped over by squatting and lifting the tire then driving it over`},
   { name: `Wall Ball`, description:  `Holding a medicine ball below the chin while facing a wall at arms length, you squat and as you stand drive the ball to a press throwing the ball in order to make contact with the wall at an 8 ft or 10 ft mark.` }
 ]

 const BODYWEIGHT = [
   { name: `Air Squat`, description: `Move from the standing position with hips below the knees, and back to standing.` },
   { name: `Back Extensions`, description: `Using a GHD, you move from an L-shaped position with the head directly below the pelvis to an extended horizontal position.` },
   { name: `Box Jump`, description: `From standing on the floor jump and land with both feet on top of the box.  Typical heights 12,18,24,30.` },
   { name: `Burpee`, description: `Beginning in a standing position, drop to the floor with the feet extending backward, contact the floor with your chest and the tuck legs into a squat and fully stand with a small jump at the end.`},
   { name: `Handstand Push-Up`, description: `Beginning in a handstand bend arms until the head touches the ground then push yourself back to the fully extended handstand position.` },
   { name: `Jump Rope`, description: `The most variation in CrossFit is referred to as the “Double Under” in which the jump ropes makes two revolutions per jump.` },
   { name: `Knees-to-Elbows`, description:  `Hanging from the pull-up bar raise the knees until they make contact with the elbows and then fully extend and repeat.` },
   { name: `Lunge`, description: `Take a large step forward, bending the front knee until the back knee makes contact with the ground then back up and alternate`},
   { name: `Muscle-Up`, description: `Hanging from gymnastic rights perform a pull-up to a ring dip then fully extend to locked out position.` },
   { name: `Ring Dip`, description:  `Starting with your body supported on the rings straight vertical arms, lower your body until the shoulders drops below the elbow then push yourself back to starting position.` },
   { name: `Pull-Up`, description: `Starting from a hanging position with arms straight pull up until the chin is over the bar or the chest touches the bar then lower ones self back tot he starting position and repeat` },
   { name: `Push-Up`, description:  `Starting in the plank position arms fully locked out lower ones self to the floor and as your chest touches the floor push yourself back to a fully extended position.` },
   { name: `Sit-Up`, description: `With the assistance of an Ab-Mat placed under the lower back move from sitting to shoulders on the ground and back to a sitting position.` },
   { name: `Rope-Climb`, description: `Starting from the ground, you slowly climb the rope and touch a point typically 15″ and lower yourself back down in a safe & controlled manner.` }
 ]
