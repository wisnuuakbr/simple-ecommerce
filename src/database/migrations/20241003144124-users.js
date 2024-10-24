'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.BIGINT(20),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            user_mail: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            user_pass: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable('Users');
    }
};
