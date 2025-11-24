import rateLimit from "express-rate-limit";


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limite de 100 requêtes par `windowMs`
  standardHeaders: true, // désactive les headers `RateLimit-*`
  legacyHeaders: false, // désactive les headers `X-RateLimit-*`
});

export default limiter;