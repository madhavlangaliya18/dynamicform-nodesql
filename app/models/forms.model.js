module.exports = (sequelize, DataTypes ,Sequelize) => {

    const Formschema = sequelize.define('Forms', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        form_name: {
            type: DataTypes.STRING,
            allowNull: false,
            // defaultValue: "test"

        },
        form_key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        submitButtonName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        fields: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            // get(val) {
            //     return this.getDataValue('fields', JSON.parse(val ?? ""));
            // },
            // // set(val) {
            // //    this.setDataValue('fields',val.join(';'));
            // // },
            set(val) {
                this.setDataValue("fields", JSON.stringify(val ?? ""));
              },
        }
    },);
    // `sequelize.define` also returns the model
    // console.log(Formschema === sequelize.models.Forms); // true


    return Formschema;
} 