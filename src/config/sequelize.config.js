require("dotenv").config();

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    dialect: "mysql",
};

module.exports = config;