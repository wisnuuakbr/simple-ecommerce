const ProductUseCase = require("../usecases/productUseCase");
const redis = require("../config/redis.config");

class ProductController {
    constructor() {
        this.productUseCase = new ProductUseCase();
    }

    // Redis GET
    async redisGetAsync(key) {
        try {
            return await redis.get(key);
        } catch (err) {
            console.error("Redis GET Error:", err);
            throw err;
        }
    }

    // Redis SET
    async redisSetAsync(key, value, expiration = 60) {
        try {
            await redis.setEx(key, expiration, value);
        } catch (err) {
            console.error("Redis SET Error:", err);
            throw err;
        }
    }

    async listProducts(req, res) {
        try {
            const query = req.query;
            const cacheKey = `product:${JSON.stringify(query)}`;

            const cacheProducts = await this.redisGetAsync(cacheKey);
            if (cacheProducts) {
                return res.status(200).json({
                    success: true,
                    message: "Success",
                    products: JSON.parse(cacheProducts),
                });
            }

            // If data not in cache, get from db
            const result = await this.productUseCase.listProducts(query);

            // Result query cache in Redis within 1 second (def: 3600)
            await this.redisSetAsync(cacheKey, JSON.stringify(result), 60)

            res.status(200).json({
                success: true,
                message: "Success",
                ...result,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getProductById(req, res) {
        try {
            const productId = req.params.id;
            const result = await this.productUseCase.getProductById(productId);

            res.status(200).json({
                success: true,
                message: "Success",
                data: result.products
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = ProductController;