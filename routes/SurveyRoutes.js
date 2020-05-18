/**
 * Sets up all the routes for the survey api. Uses the survey controller to specify functions for each route.
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/SurveyController');

// All functions from survey controller.
const {
    getAllSurveys,
    getSurveyById,
    getSurveyByEmployeeId,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    patchSurveyActive,
} = controller;

// Sets up the routes.
router.get('/', getAllSurveys);
router.get('/:id', getSurveyById);
router.get('/e/:id', getSurveyByEmployeeId);
router.post('/', createSurvey);
router.put('/:id', updateSurvey);
router.delete('/:id', deleteSurvey);
router.patch('/:id', patchSurveyActive);

module.exports = router;
