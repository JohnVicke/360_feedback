const express = require('express');
const router = express.Router();
const controller = require('../controllers/QuestionareController');

const { getQuestionareInformation } = controller;

router.get('/:id', getQuestionareInformation);

module.exports = router;
