const Movies = require('../models/Movie');

getMovies = async (req, res) => {
    try {
        const movies = await Movies.find();
        res.json(movies);
    } catch (err) {
        res.json({ message: err });
    }
};

postMovie = async (req, res) => {
    const movie = new Movies({
        id: req.body.id,
        name: req.body.name,
        genre: req.body.genre,
        type: req.body.type,
        rating: req.body.rating,
        desc: req.body.desc
    });
    try {
        const savedMovie = await movie.save();
        res.json(savedMovie);
    } catch (err) {
        res.json({ message: err });
    }
};

getMovieById = async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        res.json(movie);
    } catch (err) {
        res.json({ message: err });
    }
};

deleteMovieById = async (req, res) => {
    try {
        const removedMovie = await Movies.deleteOne({ _id: req.params.id });
        res.json(removedMovie);
    } catch (err) {
        res.json({ message: err });
    }
};

patchMovieById = async (req, res) => {
    try {
        const updatedMovie = await Movies.updateOne(
            { _id: req.params.id },
            { $set: { name: req.body.name } }
        );
        res.json(updatedMovie);
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = {
    getMovies,
    postMovie,
    getMovieById,
    deleteMovieById,
    patchMovieById
};
