import 'dotenv/config';
import app from '../dist-api/app.js';

// Vercel function entry. npm run build:api bundles server/ + database/ into
// dist-api/app.js so this import is a real JS module, not a TypeScript path.
export default app;
