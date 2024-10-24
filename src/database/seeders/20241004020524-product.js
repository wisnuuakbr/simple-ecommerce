'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        await queryInterface.bulkInsert('Products', [
            {
                product_name: 'Product 1',
                product_desc: 'Description for Product 1',
                product_price: 100.00,
                product_category: "cat 1",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 2',
                product_desc: 'Description for Product 2',
                product_price: 150.00,
                product_category: "cat 1",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 3',
                product_desc: 'Description for Product 3',
                product_price: 200.00,
                product_category: "cat 2",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 4',
                product_desc: 'Description for Product 4',
                product_price: 250.00,
                product_category: "cat 3",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 5',
                product_desc: 'Description for Product 5',
                product_price: 300.00,
                product_category: "cat 3",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 6',
                product_desc: 'Description for Product 6',
                product_price: 350.00,
                product_category: "cat 4",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 7',
                product_desc: 'Description for Product 7',
                product_price: 400.00,
                product_category: "cat 5",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 8',
                product_desc: 'Description for Product 8',
                product_price: 450.00,
                product_category: "cat 6",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 9',
                product_desc: 'Description for Product 9',
                product_price: 500.00,
                product_category: "cat 7",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                product_name: 'Product 10',
                product_desc: 'Description for Product 10',
                product_price: 550.00,
                product_category: "cat 8",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Products', null, {});
    }
};
