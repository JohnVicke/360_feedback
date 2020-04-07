const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');

const { getAllUsers } = controller;

router.get('/', getAllUsers);

module.exports = router;
