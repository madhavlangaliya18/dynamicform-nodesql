module.exports = (sequelize, Sequelize) => {
    const FieldsSchema = sequelize.define('Fields', {
        field_label: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        field_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        field_type: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        iseditable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        isvisibletolist: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        field_values: {
            type: Sequelize.JSON,
            allowNull: false,   

        },
        validation: {
            type: Sequelize.JSON,
            allowNull: false,
        },

    });

    return FieldsSchema;
} 