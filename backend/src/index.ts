import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Trust the reverse proxy in front of us (vps1 edge nginx -> vps2 inner nginx -> Express).
// This makes req.ip and X-Forwarded-For work correctly so rate-limiting keys on the real
// client IP, not on 127.0.0.1 (which would let one bad actor exhaust everyone's quota).
app.set('trust proxy', 1);

const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || 'https://wallet.ratatoskr.enchantedforestdefi.com';

// Security headers
app.use(helmet());

// CORS - only allow the wallet frontend
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
  })
);

// Parse JSON bodies (for broadcast endpoint)
app.use(express.json({ limit: '100kb' }));

// Rate limiting: 60 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});
app.use('/api', limiter);

// Stricter rate limit for broadcast (5 per minute)
const broadcastLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many broadcast requests' },
});
app.use('/api/broadcast', broadcastLimiter);

// API routes
app.use('/api', routes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Wallet API running on port ${PORT}`);
});
