'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                type: Sequelize.BIGINT(20),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            product_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            product_desc: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            product_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            product_category: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    }
};
