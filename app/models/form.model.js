module.exports = (sequelize, Sequelize) => {
    const Form = sequelize.define('Form', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Form;
} 