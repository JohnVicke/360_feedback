const express = require('express');
const router = express.Router();
const Movies = require('../models/Movie');

// Get all
router.get('/', async (req, res) => {
    try {
        const movies = await Movies.find();
        res.json(movies);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post new entry
router.post('/', async (req, res) => {
    const movie = new Movies({
        id: req.body.id,
        name: req.body.name,
        genre: req.body.genre,
        type: req.body.type,
        rating: req.body.rating
    });
    try {
        const savedMovie = await movie.save();
        res.json(savedMovie);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        res.json(movie);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const removedMovie = await Movies.deleteOne({ _id: req.params.id });
        res.json(removedMovie);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update
router.patch('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movies.updateOne(
            { _id: req.params.id },
            { $set: { name: req.body.name } }
        );
        res.json(updatedMovie);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
