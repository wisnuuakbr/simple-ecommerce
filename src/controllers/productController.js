const ProductUseCase = require("../usecases/productUseCase");

class ProductController {
    constructor() {
        this.productUseCase = new ProductUseCase();
    }

    async listProducts(req, res) {
        try {
            const query = req.query;
            const result = await this.productUseCase.listProducts(query);

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