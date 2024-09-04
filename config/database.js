const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_table', 'root', 'P&h@1927', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;