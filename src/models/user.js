const DataTypes = require("sequelize");
const sequelize = require("../config/config");

const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.BIGINT(36),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_mail: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    user_pass: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
});

module.exports = Users;
