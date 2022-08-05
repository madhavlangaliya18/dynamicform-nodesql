module.exports = (sequelize, Sequelize) => {
    const Formschema = sequelize.define('Forms', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
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
        // fields_id: {
        //     type: Sequelize.INTEGER(11),
        //     references: {
        //         model: 'Fields',
        //         key: 'id'
        //     }
        // },

    });

    return Formschema;
} 