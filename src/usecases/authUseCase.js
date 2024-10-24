const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/userRepository");

class AuthUseCase {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(user) {
        try {
            // Check user email
            const existingUserMail = await this.userRepository.getUserByEmail(user.user_mail);
            if (existingUserMail) {
                throw new Error("Email already exists");
            }

            // Check user name
            const existingUserName = await this.userRepository.getUserByUsername(user.user_name);
            if (existingUserName) {
                throw new Error("Username already exists");
            }

            // Encrypt the password
            const hashedPassword = await bcrypt.hash(user.user_pass, 10);
            const userField = {
                user_name: user.user_name,
                user_mail: user.user_mail,
                user_pass: hashedPassword,
                created_at: new Date(),
            };

            const userData = await this.userRepository.createUser(userField);

            return {
                user: {
                    user_id: userData.id,
                    user_name: userData.user_name,
                    user_mail: userData.user_mail
                }
            };
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            // Check email
            const userData = await this.userRepository.getUserByEmail(email);
            if (!userData) {
                throw new Error("Invalid email");
            }

            // Compare password with the stored hashed password
            const isMatch = await bcrypt.compare(password, userData.user_pass);
            // console.log(isMatch);
            if (!isMatch) {
                throw new Error("Invalid password");
            }

            // Generate token
            const token = jwt.sign(
                { id: userData.id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRATION || "1h" }
            );

            return {
                user: {
                    user_id: userData.id,
                    user_name: userData.user_name,
                    user_mail: userData.user_mail
                },
                token
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthUseCase;
