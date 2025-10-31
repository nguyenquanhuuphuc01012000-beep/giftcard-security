import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 120,            // 120 req/phút/IP
  standardHeaders: true,
  legacyHeaders: false,
});
