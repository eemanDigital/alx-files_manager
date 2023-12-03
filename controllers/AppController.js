const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

exports.getStatus = (req, res) => {
  res.status(200).json({
    redis: redisClient.isAlive(),
    db: dbClient.isAlive(),
  });
};

exports.getStats = (req, res) => {
  res.status(200).json({
    users: dbClient.nbUsers(),
    files: dbClient.nbFiles(),
  });
};
