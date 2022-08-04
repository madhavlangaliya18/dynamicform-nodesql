module.exports = (sequelize, Sequelize) => {
    const Formentriesschema = sequelize.define('Formsentries', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        form_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Forms',
                key: 'id'
            }
        },
    });

    return Formentriesschema;
} 