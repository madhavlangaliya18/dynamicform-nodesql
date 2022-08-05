module.exports = (sequelize, Sequelize) => {
    const FormsDataEntriesSchema = sequelize.define('FormsDataEntries', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
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
        field_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Fields',
                key: 'id'
            }
        },
        entry_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Formsentries',
                key: 'id'
            }
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return FormsDataEntriesSchema;
} 