const rateLimit = require('express-rate-limit');

const limiterConfig = {
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
};

const limiter = rateLimit(limiterConfig);

module.exports = limiter;
