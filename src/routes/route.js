const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require('../middlewares/authValidation');
const authMiddleware = require("../middlewares/authMiddleware");
const AuthController = require("../controllers/authController");
const ProductController = require("../controllers/productController");

const authController = new AuthController();
const productController = new ProductController();

// Auth route
router.post("/register", validateRegister, authController.register.bind(authController));
router.post("/login", validateLogin, authController.login.bind(authController));

// Product route
router.get("/product", productController.listProducts.bind(productController));
router.get("/product/:id", productController.getProductById.bind(productController));

module.exports = router;