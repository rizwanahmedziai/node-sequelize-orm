const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "First Name"',
          },
          notNull: {
            msg: 'Please provide a value for "Firs Name"',
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "Last Name"',
          },
          notNull: {
            msg: 'Please provide a value for "Last Name"',
          },
        },
      },
    },
    { sequelize },
  );
  return Person;
};
