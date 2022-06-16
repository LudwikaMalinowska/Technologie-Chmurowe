const Redis = require("ioredis");

const dbConnData = {
  redis_port: process.env.REDIS_PORT || 6379,
  redis_host: process.env.REDIS_HOST || '127.0.0.1',
};
const client = new Redis(dbConnData);

module.exports = client;