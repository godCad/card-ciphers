import 'dotenv/config';
import app from './app';

// local development entry; Vercel imports the bundled Express app from api/index.js
const port = Number(process.env.PORT ?? 5050);
app.listen(port, () => console.log(`[api] listening on http://localhost:${port}`));
