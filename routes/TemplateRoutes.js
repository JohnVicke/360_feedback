/**
 * Sets up all the routes for the template api. Uses the template controller to specify functions for each route.
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/TemplateController');

// All functions from template controller.
const {
    getAllTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,
} = controller;

// Sets up the routes.
router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;
