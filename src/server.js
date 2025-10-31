import { createApp } from './app.js';
import { env } from './utils/env.js';

const app = createApp();
app.listen(env.port, () => {
  console.log(`✅ Server chạy: http://localhost:${env.port}`);
  console.log(`   Health:      http://localhost:${env.port}/health`);
  console.log(`   API:         GET /api/message, GET /api/benefits, POST /api/redeem`);
});
