const { check, body , query} = require('express-validator');
const db = require('../models')
const Forms = db.forms;
const labelmsg = require('../labels/response.labels');


exports.Create = () => {
    return [
        body('form_name').notEmpty().withMessage(labelmsg.name),
        body('form_key').notEmpty().withMessage(labelmsg.form_key).custom(value => {
            return Forms.findOne({ where: {'form_key': value }}).then(res => {
                if (res) {
                    return Promise.reject(labelmsg.keyalreadyExists);
                }
            });
        }),
        body('fields').isArray().notEmpty().withMessage("Please pass the form fields"),
        body('fields.*.field_label', `field's label is required`).notEmpty(),
        body('fields.*.field_name', `field's name is required`).notEmpty(),        
        body('fields.*.field_type', `field's type is required`).notEmpty(),
        body('fields.*.field_values', `field_values is required`).notEmpty(),
        body('fields.*.field_values', `field_values is required`).notEmpty(),
        // body('fields.*.validation').isArray().optional(),
        // body('fields.*.validation.*.validation_type', `Validation type is required`).notEmpty(),
        // body('fields.*.validation.*.validation_value', `Validation value is required`).notEmpty(),
    ];
};

exports.Update = () => {
    return [
        query('form_id').notEmpty().withMessage(labelmsg.formid)
    ];
};


exports.SaveFormDetails = () => {
    return [
        body('_id').notEmpty().withMessage(labelmsg.formid),
        body('form_key').notEmpty().withMessage(labelmsg.form_key),
        body('fields').isArray().notEmpty().withMessage("Please pass the form fields"),
        body('fields.*._id', `${labelmsg.fieldid}`).notEmpty(),
        body('fields.*.field_label', `field's label is required`).notEmpty(),
        body('fields.*.field_name', `field's name is required`).notEmpty(),        
        body('fields.*.field_type', `field's type is required`).notEmpty(),
        body('fields.*.value', `field's value is required`).optional().notEmpty(),
    ];
};

exports.UpdateFormDetails = () => {
    return[
        body('form_id').notEmpty().withMessage(labelmsg.formid),
        body('fields').isArray().notEmpty().withMessage("Please pass the form fields"),
        body('fields.*._id', `${labelmsg.fieldid}`).notEmpty(),
        body('fields.*.field_label', `field's label is required`).notEmpty(),
        body('fields.*.field_name', `field's name is required`).notEmpty(),        
        body('fields.*.field_type', `field's type is required`).notEmpty(),
        body('fields.*.value', `field's value is required`).optional().notEmpty()
    ]
}
