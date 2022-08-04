module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'password',
    DB: 'products_db',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 100
    },
    logging:false
}