module.exports = (sequelize, Sequelize) => {
    const Formentriesschema = sequelize.define('formsentries', {
        form_id: {
            type: Sequelize.STRING
        },
    });

    return Formentriesschema;
} 