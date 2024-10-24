const ProductRepository = require("../repositories/productRepository");

class ProductUseCase {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async listProducts(query) {
        try {
            // Get all product
            const { products, totalCount, currentPage, totalPages } = await this.productRepository.getAllProduct(query);

            return {
                products,
                currentPage,
                totalCount,
                totalPages,
                hasMore: currentPage < totalPages,
            };
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            // Get product by id
            const products = await this.productRepository.getProductById(id);

            if (!products) {
                throw new Error("Product not found");
            }

            return {
                products
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductUseCase;
