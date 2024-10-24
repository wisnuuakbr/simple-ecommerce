const OrderUseCase = require("../usecases/orderUseCase");

class OrderController {
    constructor() {
        this.orderUseCase = new OrderUseCase();
    }

    async createOrder(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.orderUseCase.createOrder(userId);

            res.status(201).json({
                success: true,
                message: "Success",
                data: result.orders
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getOrderHistory(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.orderUseCase.getOrderHistory(userId);

            res.status(200).json({
                success: true,
                message: "Success",
                data: result.orders
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = OrderController;
