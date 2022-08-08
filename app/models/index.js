const dbConfig = require('../config/db.config')

const { Sequelize, DataTypes, Op } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging:false
})

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.forms = require('./forms.model.js')(sequelize, Sequelize)
// db.fields = require('./fields.model.js')(sequelize, Sequelize)
// db.formsdataentries = require('./formsDataEntries.model.js')(sequelize, Sequelize)
// db.formsentries = require('./formsEntries.model.js')(sequelize, Sequelize)

// db.forms.belongsToMany(db.forms, {
//     through: "user_roles",
//     foreignKey: "role_id",
//     otherKey: "user_id"
//   });
  // db.fields.hasOne(db.fields, {
  //   through: "fields",
  //   foreignKey: "form_id",
  // });

module.exports = db;