const { Sequelize } = require('sequelize');

const database = 'clon_spotify';
const username = 'root';
const password = 'root';
const host = '127.0.0.1';
const dialect = 'mysql';
const port = 3306;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

module.exports = { sequelize, connectToDB };
