const db = require('./db');
const { Movie, Person } = db.models;

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
	} catch (error) {
		if (error.name === 'SequelizeValidationError') {
			const errors = error.errors.map((err) => err.message);
			console.error('Validation errors: ', errors);
		} else {
			throw error;
		}
	}
})();
