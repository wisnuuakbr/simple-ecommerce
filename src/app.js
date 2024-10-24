const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/route")
const config = require("./config/config");
const cors = require("cors");
// const association = require("./models");

dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.setMiddleware();
        this.setRoutes();
        this.connectToDatabase();
        // this.db = association;
    }

    setMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    setRoutes() {
        this.app.use("/api/v1", routes);
    }

    async connectToDatabase() {
        try {
            await config.authenticate();
            console.log("Connected to the database");
        } catch (err) {
            console.error("Unable to connect to the database:", err);
        }
    }

    // Start the server
    start() {
        const PORT = process.env.APP_PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}

module.exports = App;