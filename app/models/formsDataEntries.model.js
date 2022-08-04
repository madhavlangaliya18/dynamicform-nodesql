module.exports = (sequelize, Sequelize) => {
    const FormsDataEntriesSchema = sequelize.define('FormsDataEntries', {
        form_id: {
            type: Sequelize.STRING
        },
        field_id: {
            type: Sequelize.STRING
        },
        entry_id  : {
            type: Sequelize.BOOLEAN
        },
        value  : {
            type: Sequelize.BOOLEAN
        }
    });

    return FormsDataEntriesSchema;
} 