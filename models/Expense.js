const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
    name: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'expenses',
    timestamps: false,
});

module.exports = Expense;