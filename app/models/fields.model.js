module.exports = (sequelize, Sequelize) => {
    const FieldsSchema = sequelize.define('Fields', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        field_label: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        field_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        field_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        iseditable: {
            type: Sequelize.BOOLEAN,
        },
        isvisibletolist: {
            type: Sequelize.BOOLEAN,
        },
        // field_values: {
        //     type: Sequelize.TEXT,
        //     allowNull: false,

        // },
        // validation: {
        //     type: Sequelize.TEXT,
        //     allowNull: false,
        // },
        form_id: {
            type: Sequelize.INTEGER(11),
            references: {
                model: 'Forms',
                key: 'id'
            }
        },

    });

    return FieldsSchema;
} 