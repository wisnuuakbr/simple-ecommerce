const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require('../middlewares/authValidation');
const authMiddleware = require("../middlewares/authMiddleware");
const AuthController = require("../controllers/authController");
const ProductController = require("../controllers/productController");
const CartController = require("../controllers/cartController");
const OrderController = require("../controllers/orderController");

const authController = new AuthController();
const productController = new ProductController();
const cartController = new CartController();
const orderController = new OrderController();

// Auth route
router.post("/register", validateRegister, authController.register.bind(authController));
router.post("/login", validateLogin, authController.login.bind(authController));

// Product route
router.get("/product", productController.listProducts.bind(productController));
router.get("/product/:id", productController.getProductById.bind(productController));

// Cart route
router.post('/cart', authMiddleware, cartController.addToCart.bind(cartController));
router.get('/cart', authMiddleware, cartController.getCart.bind(cartController));
router.put('/cart/:id', authMiddleware, cartController.updateCart.bind(cartController));

// Order route
router.post('/order', authMiddleware, orderController.createOrder.bind(orderController));
router.get('/order', authMiddleware, orderController.getOrderHistory.bind(orderController));

module.exports = router;