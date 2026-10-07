import mongoose from 'mongoose';

// cache the connection on the global object so warm serverless invocations reuse it
const g = globalThis as typeof globalThis & { _db?: Promise<typeof mongoose> };

export function connectDb(): Promise<typeof mongoose> {
  if (!g._db) {
    const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/gift-card-exchange';
    g._db = mongoose.connect(uri).then((m) => {
      console.log(`[db] connected to ${uri}`);
      return m;
    });
  }
  return g._db;
}
