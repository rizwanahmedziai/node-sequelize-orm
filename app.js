/* eslint-disable no-console */
const db = require('./db');

const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

(async () => {
  await db.sequelize.sync({ force: true });
  try {
    const movie = await Movie.create({
      title: 'Toy Story',
      runtime: 81,
      releaseDate: '1995-11-22',
      isAvailableOnVHS: true,
    });
    console.log(movie.toJSON());
    const movie2 = await Movie.create({
      title: 'The Incredibles',
      runtime: 115,
      releaseDate: '2004-04-14',
      isAvailableOnVHS: true,
    });
    console.log(movie2.toJSON());
    const person = await Person.create({
      firstName: 'John',
      lastName: 'Doe',
    });
    console.log(person.toJSON());

    const movie3 = await Movie.build({
      title: 'Toy Story 3',
      runtime: 103,
      releaseDate: '2010-06-18',
      isAvailableOnVHS: false,
    });
    await movie3.save(); // save the record
    console.log(movie3.toJSON());


    // Reading Data from database

    const movieById = await Movie.findByPk(11);
    console.log('Retrieved Data from Database');
    if (movieById) {
      console.log(movieById.toJSON());
    } else {
      console.log('Record not found!');
    }

    // Find Specific Record
    const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });

    console.log('Specific Record from Database');
    if (movieByRuntime) {
      console.log(movieByRuntime.toJSON());
    } else {
      console.log('Record not found!');
    }


    // Retrieve all Records
    console.log('All Movie Records from Database');
    const movies = await Movie.findAll();
    if (movies) {
      console.log(movies.map(movie => movie.toJSON()));
    } else {
      console.log('Record not found!');
    }

    // Retreive specific columns/attributes
    console.log('Specific Movie Columns from Database');
    const movies1 = await Movie.findAll({
      attributes: ['id', 'title'], // return only id and title
      where: {
        isAvailableOnVHS: true,
        releaseDate: {
          [Op.gte]: '2004-01-01', // greater than or equal to the date
        },
        runtime: {
          [Op.gt]: 95, // greater than 95
        },
      },
      order: [['id', 'DESC']], // IDs in descending order
    });
    console.log(movies1.map(movie => movie.toJSON()));


    // Update Operation
    console.log('Updatea Record from Database');
    const toyStory3 = await Movie.findByPk(3);
    toyStory3.isAvailableOnVHS = true;
    await toyStory3.save();

    console.log(toyStory3.get({ plain: true }));
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();

// Reading Data from database
/*
(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movieById = await Movie.findByPk(1);
    console.log('Retrieved Data from Database');
    console.log(movieById.toJSON());
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();
*/
