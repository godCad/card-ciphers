import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { connectDb } from '../database/connect';
import { adminRouter } from './routes/admin.routes';
import { cardRouter } from './routes/card.routes';

const app = express();
app.use(cors());
app.use(express.json());

// ensure the db connection is ready before any route runs (also works per-invocation on serverless)
app.use((_req, _res, next) => {
  connectDb().then(() => next()).catch(next);
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/admins', adminRouter);
app.use('/api/cards', cardRouter);

// central error handler so thrown/rejected route code returns json, not a crash
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[api] error:', err);
  res.status(500).json({ message: 'server error' });
});

export default app;
