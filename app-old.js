/* eslint-disable no-console */
const Sequilize = require('sequelize');

const sequelize = new Sequilize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: true, // disable logging
});

class Movie extends Sequilize.Model {}
Movie.init(
  {
    title: Sequilize.STRING,
  },
  { sequelize },
);

(async () => {
  // Sync 'Movies' table
  // await Movie.sync();

  await sequelize.sync({ force: true }); // Delete and recreate existing tables
  try {
    // Test Connection
    // await sequelize.authenticate();
    // console.log('Connection to the database successful!');

    // Instance of the Movie class represents a database row
    const movie = await Movie.create({
      title: 'Toy Story',
    });
    console.log(movie.toJSON());

    // New entry
    const movie2 = await Movie.create({
      title: 'The Incredibles',
    });
    console.log(movie2.toJSON());

    // Or Create multiple entries withuot declaring a new variable
    await Movie.create({
      title: 'Invisible Man',
    });

    await Movie.create({
      title: 'The Matrix',
    });

    // -----------------------------------------//
    // ---Another way --//
    const movieInstances = await Promise.all([
      Movie.create({
        title: 'Matrix 2',
      }),
      Movie.create({
        title: 'The Inception',
      }),
    ]);
    const moviesJSON = movieInstances.map((mov) => mov.toJSON());
    console.log(moviesJSON);
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();
