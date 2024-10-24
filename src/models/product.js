const DataTypes = require("sequelize");
const sequelize = require("../config/config");

const Products = sequelize.define("Products", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    product_desc: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    product_category: {
        type: DataTypes.STRING(50),
        allowNull: true
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

module.exports = Products;