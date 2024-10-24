const AuthUseCase = require("../usecases/authUseCase");

class AuthController {
    constructor() {
        this.authUseCase = new AuthUseCase();
    }

    async register(req, res) {
        try {
            const userData = await this.authUseCase.register(req.body);

            res.status(201).json({
                success: true,
                message: 'Success',
                data: userData.user
            });
        } catch (error) {
            if (error.message === "Email or Username already exists") {
                return res.status(400).json(
                    { message: error.message }
                );
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async login(req, res) {
        try {
            const userData = await this.authUseCase.login(
                req.body.user_mail,
                req.body.user_pass
            );

            res.status(200).json({
                success: true,
                message: 'Success',
                data: userData.user,
                token: userData.token
            });
        } catch (error) {
            if (error.message === "Invalid email or password") {
                return res.status(401).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = AuthController;