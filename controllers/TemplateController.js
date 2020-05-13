/**
 * Controller class for template. Sets up all the functions to communicate with the database collection templates.
 */
const Template = require('../models/Template');

/**
 * Gets all templates from collection.
 */
getAllTemplates = async (req, res) => {
    await Template.find({}, (err, templates) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!templates.length) {
            return res.status(404).json({
                success: false,
                error: `No templates found`,
                data: templates,
            });
        }

        return res.status(200).json({
            success: true,
            data: templates,
        });
    }).catch((err) => console.log(err));
};

/**
 * Gets an id specified template from collection.
 */
getTemplateById = async (req, res) => {
    try {
        const template = await Template.findOne({ _id: req.params.id });
        res.json(template);
    } catch {
        res.json({ message: err });
    }
};

/**
 * Inserts a new template in the template collection.
 */
createTemplate = (req, res) => {
    const body = req.body;
    // Return error message if no body is provided.
    if (!body) {
        return res
            .status(400)
            .json({ success: false, error: 'You must provide a template!' });
    }

    const template = new Template(body);

    // Return error if template couldn't be created.
    if (!template) {
        return res.status(400).json({ success: false, error: err });
    }

    template
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: template._id,
                message: 'Template created!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Template not created!',
            });
        });
};

/**
 * Updates a template in the template collection.
 */
updateTemplate = async (req, res) => {
    const body = req.body;

    // Return error message if no body is provided.
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a template to update!',
        });
    }

    await Template.findOne({ _id: req.params.id }, (err, template) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Template not found!',
            });
        }

        // Updates the fields for the template and saves it in the database.
        template.sections = body.sections;
        template.created = body.created;
        template.last_used = body.last_used;
        template.name = body.name;
        template.description = body.description;
        template.creator = body.creator;
        template
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: template._id,
                    message: 'Template updated!',
                });
            })
            .catch((error) => {
                return res.status(404).json({
                    error,
                    message: 'Template not updated!',
                });
            });
    });
};

/**
 * Finds a template by id and deletes it.
 */
deleteTemplate = async (req, res) => {
    await Template.findOneAndDelete({ _id: req.params.id }, (err, template) => {
        // Returns error in case of some unexpected error.
        if (err) {
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
        // Returns error if no template was found.
        if (!template) {
            return res.status(404).json({
                success: false,
                error: 'Template not found!',
            });
        }

        return res.status(200).json({
            success: true,
            data: template,
        });
    }).catch((err) => console.log(err));
};

module.exports = {
    getAllTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,
};
