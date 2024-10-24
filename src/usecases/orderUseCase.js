const OrderRepository = require("../repositories/orderRepository");
const CartRepository = require("../repositories/cartRepository");

class OrderUseCase {
    constructor() {
        this.orderRepository = new OrderRepository();
        this.cartRepository = new CartRepository();
    }

    async createOrder(userId) {
        try {
            // Get items from cart
            const cartItems = await this.cartRepository.getCartItem(userId);
            if (!cartItems) {
                throw new Error("Cart is empty");
            }

            // Count total price
            const totalAmount = cartItems.reduce(
                (total, item) => total + (item.product.product_price * item.cart_quantity), 0
            );

            const orderData = {
                user_id: userId,
                order_total_amount: totalAmount,
                orderItems: cartItems.map(item => ({
                    product_id: item.product_id,
                    order_item_quantity: item.cart_quantity
                }))
            };

            // Create order
            const orders = await this.orderRepository.createOrder(orderData);

            // Delete item from cart when order is created
            try {
                await this.cartRepository.clearCart(userId);
            } catch (clearCartError) {
                console.error('Warning: Failed to clear cart after successful order:', clearCartError);
            }

            return {
                orders
            };
        } catch (error) {
            throw error;
        }
    }

    async getOrderHistory(userId) {
        try {
            // Get order history by user id
            const orders = await this.orderRepository.getOrdersByUserId(userId);

            return {
                orders
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderUseCase;
