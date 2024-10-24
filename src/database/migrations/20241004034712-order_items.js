'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order_items', {
            id: {
                type: Sequelize.BIGINT(20),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            order_id: {
                type: Sequelize.CHAR(36),
                allowNull: false,
                references: {
                    model: 'Orders',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            product_id: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            order_item_quantity: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('order_items');
    }
};
