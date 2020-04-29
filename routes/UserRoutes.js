/**
 * Sets up all the routes for the user api. Uses the user controller to specify functions for each route.
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');

// All functions from user controller.
const {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
} = controller;

// Sets up the routes.
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/email/:id', getUserByEmail);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
