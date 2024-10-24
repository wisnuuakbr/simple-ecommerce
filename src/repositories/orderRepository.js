const { Orders, OrderItems, Products } = require("../models");

class OrderRepository {
    async createOrder(orderData) {
        try {
            const result = await Orders.sequelize.transaction(async (t) => {

                const order = await Orders.create({
                    user_id: orderData.user_id,
                    order_total_amount: orderData.order_total_amount
                }, { transaction: t });

                const orderItems = orderData.orderItems.map(item => ({
                    order_id: order.id,
                    product_id: item.product_id,
                    order_item_quantity: item.order_item_quantity
                }));

                await OrderItems.bulkCreate(orderItems, { transaction: t });

                return order;
            });

            const completeOrder = await Orders.findByPk(result.id, {
                include: [{
                    model: OrderItems,
                    as: 'orderItem',
                    include: [{
                        model: Products,
                        as: 'product'
                    }]
                }]
            });

            return completeOrder;
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByUserId(userId) {
        try {
            return await Orders.findAll({
                where: { user_id: userId },
                include: [{
                    model: OrderItems,
                    as: 'orderItem',
                    include: [{
                        model: Products,
                        as: 'product'
                    }]
                }]
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderRepository;
