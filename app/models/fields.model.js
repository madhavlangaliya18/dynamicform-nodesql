module.exports = (sequelize, Sequelize) => {
    const FieldsSchema = sequelize.define('Fields', {
        field_label: {
            type: Sequelize.STRING
        },
        field_name: {
            type: Sequelize.STRING
        },
        field_type: {
            type: Sequelize.BOOLEAN
        },
        iseditable: {
            type: Sequelize.BOOLEAN
        },
        isvisibletolist: {
            type: Sequelize.BOOLEAN
        },
        field_values: {
            type: Sequelize.STRING
        },
        validation: {
            type: Sequelize.STRING
        },

    });

    return FieldsSchema;
} 