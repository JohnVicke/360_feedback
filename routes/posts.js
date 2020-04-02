const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies');

const {
    getMovies,
    postMovie,
    getMovieById,
    deleteMovieById,
    patchMovieById
} = movieController;

router.get('/', getMovies);
router.post('/', postMovie);
router.get('/:id', getMovieById);
router.delete('/:id', deleteMovieById);
router.patch('/:id', patchMovieById);

module.exports = router;
