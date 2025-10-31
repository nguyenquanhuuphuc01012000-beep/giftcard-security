import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './utils/env.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import giftcardRoutes from './routes/giftcard.routes.js';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

  app.use(cors({ origin: env.clientOrigin }));
  app.use(express.json());

  app.use('/api', apiLimiter);
  app.use('/api', giftcardRoutes);

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.use(notFound);
  app.use(errorHandler);
  return app;
};
