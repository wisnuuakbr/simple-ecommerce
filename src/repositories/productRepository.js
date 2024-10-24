const { Products } = require("../models");
const { Op } = require('sequelize');

class ProductRepository {
    async getAllProduct(query) {
        const { name, sortBy, order, category, page = 1, limit = 10 } = query;
        const where = {};

        if (name) {
            where.product_name = { [Op.like]: `%${name}%` };
        }

        if (category) {
            where.product_category = { [Op.like]: `%${category}%` };
        }

        const offset = (page - 1) * limit;

        try {
            const products = await Products.findAndCountAll({
                where,
                order: sortBy ? [[sortBy, order || 'ASC']] : undefined,
                limit: parseInt(limit),
                offset: parseInt(offset),
            });
            return {
                products: products.rows,
                totalCount: products.count,
                currentPage: page,
                totalPages: Math.ceil(products.count / limit),
            };
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            return await Products.findByPk(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductRepository;
