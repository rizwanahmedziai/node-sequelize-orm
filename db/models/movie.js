/* eslint-disable no-tabs */
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init(
    {
      // Set custom primary key column
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, // disallow null
        validate: {
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "title"',
          },
          notNull: {
            msg: 'Please provide a value for "title"',
          },
        },
      },
      runtime: {
        type: Sequelize.INTEGER,
        allowNull: false, // disallow null
        validate: {
          notNull: {
            msg: 'Please provide a value for "runtime"',
          },
          min: {
            args: 1,
            msg: 'Please provide a value greater than "0" for "runtime"',
          },
        },
      },
      releaseDate: {
        type: Sequelize.DATEONLY, // yyyy-mm-dd
        allowNull: false, // disallow null
        validate: {
          notNull: {
            msg: 'Please provide a value for "releaseDate"',
          },
          isAfter: {
            args: '1895-12-27',
            msg:
							// eslint-disable-next-line no-tabs
							'Please provide a value on or after "1895-12-28" for "releaseDate"',
          },
        },
      },
      isAvailableOnVHS: {
        type: Sequelize.BOOLEAN,
        allowNull: false, // disallow null
        defaultValue: false, // set default value
        validate: {},
      },
    },
    {
      // Defined in the index.js file in define:
      // freezeTableName: true, // disable plural table names
      // timestamps: false, // disable timestamps
      sequelize,
    },
  );
  return Movie;
};
