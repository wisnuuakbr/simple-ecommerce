const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require('../middlewares/authValidation');
const AuthController = require("../controllers/authController");

const authController = new AuthController();

// Auth routes
router.post("/register", validateRegister, authController.register.bind(authController));
router.post("/login", validateLogin, authController.login.bind(authController));

module.exports = router;