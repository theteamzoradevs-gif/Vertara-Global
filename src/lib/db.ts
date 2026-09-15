import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) return null;
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 2500,
      })
      .then((m) => m)
      .catch((err: Error) => {
        cached.promise = null;
        console.warn("[db] MongoDB unavailable, using seed content:", err.message);
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function isDBReady(): Promise<boolean> {
  const conn = await connectDB();
  return Boolean(conn);
}
