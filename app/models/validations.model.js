module.exports = (sequelize, Sequelize) => {
    const Formschema = sequelize.define('Forms', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        form_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        form_key: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        submitButtonName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Formschema;
} 