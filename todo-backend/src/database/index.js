import Sequelize from 'sequelize';

const dbhost = 'localhost';
const dbuser = process.env['DB_USER'] || 'root';
const dbpassword = process.env['DB_PASSWORD'] || 'password';
const dbname = process.env['DB_NAME'] || 'todo';

const db = new Sequelize(dbname, dbuser, dbpassword, {
    host: dbhost,
    dialect: 'mysql',
});

export default db;