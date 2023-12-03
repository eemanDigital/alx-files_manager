const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

exports.getStatus = (req, res) => {
  if (redisClient.isAlive && dbClient.isAlive) {
    return res.status(200).json({
      redis: true,
      db: true,
    });
  }
  return 'not connected';
};

exports.getStats = (req, res) => {
  const users = dbClient.nbUsers;
  const files = dbClient.nbFiles;
  return res.status(200).json({
    users: users.length,
    files: files.length,
  });
};
