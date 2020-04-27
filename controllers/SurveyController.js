/**
 * Controller class for survey. Sets up all the functions to communicate with the database collection survey.
 */
const Survey = require('../models/Survey');

/**
 * Gets all survey from collection.
 */
getAllSurveys = async (req, res) => {
    await Survey.find({}, (err, surveys) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!surveys.length) {
            return res.status(404).json({
                success: false,
                error: `No surveys found`,
                data: surveys,
            });
        }

        return res.status(200).json({
            success: true,
            data: surveys,
        });
    }).catch((err) => console.log(err));
};

/**
 * Gets an id specified survey from collection.
 */
getSurveyById = async (req, res) => {
    try {
        const survey = await Survey.findOne({ _id: req.params.id });
        res.json(survey);
    } catch {
        res.json({ message: err });
    }
};

/**
 * Gets an employee id specified survey from collection.
 */
getSurveyByEmployeeId = async (req, res) => {
    try {
        const survey = await Survey.findOne({ e_id: req.params.id });
        res.json(survey);
    } catch {
        res.json({ message: err });
    }
};

/**
 * Inserts a new survey in the survey collection.
 */
createSurvey = (req, res) => {
    const body = req.body;

    // Return error message if no body is provided.
    if (!body) {
        return res
            .status(400)
            .json({ success: false, error: 'You must provide a survey!' });
    }

    const survey = new Survey(body);

    // Return error if survey couldn't be created.
    if (!survey) {
        return res.status(400).json({ success: false, error: err });
    }

    survey
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: survey._id,
                message: 'Survey created!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Survey not created!',
            });
        });
};

/**
 * Updates a survey in the survey collection.
 */
updateSurvey = async (req, res) => {
    const body = req.body;

    // Return error message if no body is provided.
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a survey to update!',
        });
    }

    await Survey.findOne({ _id: req.params.id }, (err, survey) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Survey not found!',
            });
        }

        // Updates the fields for the survey and saves it in the database.
        survey.e_id = body.e_id;
        survey.end_date = body.end_date;
        survey.template_id = body.template_id;
        survey.responses = body.responses;
        survey.creator = body.creator;
        survey
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: survey._id,
                    message: 'Survey updated!',
                });
            })
            .catch((error) => {
                return res.status(404).json({
                    error,
                    message: 'Survey not updated!',
                });
            });
    });
};

/**
 * Finds a survey by id and deletes it.
 */
deleteSurvey = async (req, res) => {
    await Survey.findOneAndDelete({ _id: req.params.id }, (err, survey) => {
        // Returns error in case of some unexpected error.
        if (err) {
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
        // Returns error if no survey was found.
        if (!survey) {
            return res.status(404).json({
                success: false,
                error: 'Survey not found!',
            });
        }

        return res.status(200).json({
            success: true,
            data: survey,
        });
    }).catch((err) => console.log(err));
};

module.exports = {
    getAllSurveys,
    getSurveyById,
    getSurveyByEmployeeId,
    createSurvey,
    updateSurvey,
    deleteSurvey,
};
