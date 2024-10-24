const CartRepository = require("../repositories/cartRepository");

class CartUseCase {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    async addToCart(userId, productId, cartQuantity) {
        try {
            // Check if same product already exist in cart
            const existingItem = await this.cartRepository.findCartItem(userId, productId);

            // If product exist in cart just update the quantity, if not exist add product to cart
            let cartItems;
            if (existingItem) {
                const newQuantity = existingItem.cart_quantity + cartQuantity;
                cartItems = await this.cartRepository.updateCartQuantity(userId, productId, newQuantity);
            } else {
                const cartItemData = { user_id: userId, product_id: productId, cart_quantity: cartQuantity };
                cartItems = await this.cartRepository.addToCart(cartItemData);
            }

            return {
                data: {
                    id: cartItems.id,
                    user_id: cartItems.user_id,
                    quantity: cartItems.cart_quantity,
                    product: {
                        product_id: cartItems.product.id,
                        product_name: cartItems.product.product_name,
                        product_price: cartItems.product.product_price,
                        product_desc: cartItems.product.product_desc
                    },
                    created_at: cartItems.created_at,
                    updated_at: cartItems.updated_at
                }
            };
        } catch (error) {
            throw error;
        }
    }

    async getCart(userId) {
        try {
            // Get cart item by user id
            const cartItems = await this.cartRepository.getCartItem(userId);

            return {
                data: cartItems.map(item => ({
                    id: item.id,
                    user_id: item.user_id,
                    quantity: item.cart_quantity,
                    product: {
                        product_id: item.product.id,
                        product_name: item.product.product_name,
                        product_price: item.product.product_price,
                        product_desc: item.product.product_desc
                    },
                    created_at: item.created_at,
                    updated_at: item.updated_at
                }))
            };
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cartId, quantity) {
        try {
            // Update cart item quantity by cart ID
            const cartItem = await this.cartRepository.updateCartById(cartId, quantity);

            if (!cartItem) {
                throw new Error("Cart item not found");
            }

            return {
                data: {
                    id: cartItem.id,
                    user_id: cartItem.user_id,
                    quantity: cartItem.cart_quantity,
                    product: {
                        product_id: cartItem.product.id,
                        product_name: cartItem.product.product_name,
                        product_price: cartItem.product.product_price,
                        product_desc: cartItem.product.product_desc
                    },
                    created_at: cartItem.created_at,
                    updated_at: cartItem.updated_at
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartUseCase;
