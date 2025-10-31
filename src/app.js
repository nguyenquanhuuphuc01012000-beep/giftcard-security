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

  // 🔒 Bảo mật + log
  app.use(helmet());
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

  // 🌐 Danh sách domain được phép truy cập
  const allowedOrigins = [
    'http://localhost:5173',                   // chạy local
    'https://giftcard-security.vercel.app',    // deploy trên Vercel
  ];

  // 🌍 Cấu hình CORS thông minh
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Cho phép Postman / server nội bộ
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.warn(`❌ CORS blocked: ${origin}`);
          callback(new Error('CORS blocked: origin not allowed -> ' + origin));
        }
      },
      methods: ['GET', 'POST'],
      credentials: true,
    })
  );

  // ✅ Debug log để kiểm tra Render
  console.log('✅ Allowed origins:', allowedOrigins);
  console.log('🌍 Environment:', env.nodeEnv);

  app.use(express.json());

  // 🛡️ Giới hạn tốc độ + router chính
  app.use('/api', apiLimiter);
  app.use('/api', giftcardRoutes);

  // 🧩 Route kiểm tra server
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  // ⚙️ Middleware xử lý lỗi
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
