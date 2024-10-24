const { Users } = require("../models");

class UserRepository {
    async createUser(user) {
        return await Users.create(user);
    }

    async getUserByEmail(email) {
        return await Users.findOne({ where: { user_mail: email } });
    }

    async getUserByUsername(username) {
        return await Users.findOne({ where: { user_name: username } });
    }
}

module.exports = UserRepository;