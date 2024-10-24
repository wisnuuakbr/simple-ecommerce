const { Carts, Products } = require('../models');

class CartRepository {
    async addToCart(cartItemData) {
        try {
            const newCart = await Carts.create(cartItemData);

            return await Carts.findOne({
                where: { id: newCart.id },
                include: [
                    {
                        model: Products,
                        as: 'product',
                        attributes: ['id', 'product_name', 'product_price', 'product_desc']
                    }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    async getCartItem(userId) {
        try {
            return await Carts.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Products,
                        as: 'product',
                        attributes: ['id', 'product_name', 'product_price', 'product_desc']
                    }
                ]
            });
        } catch (error) {
            throw new Error('Failed to retrieve cart item');
        }
    }

    async updateCartById(id, cartQuantity) {
        try {
            await Carts.update(
                { cart_quantity: cartQuantity },
                { where: { id } }
            );

            return await Carts.findOne({
                where: { id },
                include: [
                    {
                        model: Products,
                        as: 'product',
                        attributes: ['id', 'product_name', 'product_price', 'product_desc']
                    }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    async updateCartQuantity(userId, productId, cartQuantity) {
        try {
            await Carts.update(
                { cart_quantity: cartQuantity },
                { where: { user_id: userId, product_id: productId } }
            );

            return await Carts.findOne({
                where: { user_id: userId, product_id: productId },
                include: [
                    {
                        model: Products,
                        as: 'product',
                        attributes: ['id', 'product_name', 'product_price', 'product_desc']
                    }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    async findCartItem(userId, productId) {
        try {
            return await Carts.findOne({
                where: { user_id: userId, product_id: productId },
                include: [
                    {
                        model: Products,
                        as: 'product',
                        attributes: ['id', 'product_name', 'product_price', 'product_desc']
                    }
                ]
            });
        } catch (error) {
            throw new Error('Failed to find item in cart');
        }
    }

    async clearCart(userId) {
        try {
            const result = await Carts.destroy({
                where: {
                    user_id: userId
                }
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartRepository;
