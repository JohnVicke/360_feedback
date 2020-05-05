const Template = require('../models/Template');
const Survey = require('../models/Survey');

getQuestionareInformation = async (req, res) => {
    try {
        const survey = await Survey.findOne({ _id: req.params.id });
        const template = await Template.findOne({
            _id: survey.template_id,
        });

        const info = {
            name: template.name,
            description: template.description,
            sections: template.sections,
        };
        res.json(info);
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = {
    getQuestionareInformation,
};
