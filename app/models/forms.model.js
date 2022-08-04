module.exports = (sequelize, Sequelize) => {
    const Formschema = sequelize.define('Forms', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        form_name: {
            type: Sequelize.STRING
        },
        form_key: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        },
        submitButtonName: {
            type: Sequelize.STRING
        },
        fields_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Fields',
                key: 'id'
            }
        },

    });

    return Formschema;
} 