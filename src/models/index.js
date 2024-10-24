const Users = require('./user');
const Products = require('./product');
const Carts = require('./cart');
const Orders = require('./order');
const OrderItems = require('./orderItem');

// Set up associations
const setupAssociations = () => {
    // Relation carts with users
    Carts.belongsTo(Users, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
    });

    // Relation carts with products
    Carts.belongsTo(Products, {
        foreignKey: 'product_id',
        targetKey: 'id',
        as: 'product'
    });

    // Relation users with carts
    Users.hasMany(Carts, {
        foreignKey: 'user_id',
        as: 'cart'
    });

    // Relation users with orders
    Users.hasMany(Orders, {
        foreignKey: 'user_id',
        as: 'order'
    });

    // Products carts with carts
    Products.hasMany(Carts, {
        foreignKey: 'product_id',
        as: 'cart'
    });

    // Relation orders with users
    Orders.belongsTo(Users, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
    });

    // Relation orders with order items
    Orders.hasMany(OrderItems, {
        foreignKey: 'order_id',
        as: 'orderItem'
    });

    // Relation order items with products
    OrderItems.belongsTo(Products, {
        foreignKey: 'product_id',
        targetKey: 'id',
        as: 'product'
    });

    // Relation order items with orders
    OrderItems.belongsTo(Orders, {
        foreignKey: 'order_id',
        targetKey: 'id',
        as: 'order'
    });

};

setupAssociations();

module.exports = {
    Users,
    Products,
    Carts,
    Orders,
    OrderItems
};