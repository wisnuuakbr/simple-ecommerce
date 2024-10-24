const CartUseCase = require("../usecases/cartUseCase");

class CartController {
    constructor() {
        this.cartUseCase = new CartUseCase();
    }

    async addToCart(req, res) {
        try {
            const userId = req.user.id;
            const { product_id, quantity } = req.body;
            const result = await this.cartUseCase.addToCart(userId, product_id, quantity);

            res.status(201).json({
                success: true,
                message: "Success",
                ...result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getCart(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.cartUseCase.getCart(userId);

            res.status(200).json({
                success: true,
                message: "Success",
                ...result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateCart(req, res) {
        try {
            const cartId = req.params.id;
            const { quantity } = req.body;
            const result = await this.cartUseCase.updateCart(cartId, quantity);

            res.status(200).json({
                success: true,
                message: "Success",
                ...result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = CartController;
