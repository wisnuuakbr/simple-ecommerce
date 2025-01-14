const redis = require('redis');
require('dotenv').config();

// Create redis connections
const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD || null,
    database: process.env.REDIS_DB || 0,
});

// Connect to redis client
redisClient.connect().catch(console.error);

// Error handling
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = redisClient;
