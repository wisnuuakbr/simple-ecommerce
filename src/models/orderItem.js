const DataTypes = require("sequelize");
const sequelize = require("../config/config");

const OrderItems = sequelize.define("order_items", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    order_id: {
        type: DataTypes.CHAR(36),
        allowNull: false
    },
    product_id: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    order_item_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
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

module.exports = OrderItems;
