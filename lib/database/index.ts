import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connect() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  // cache the database connection
  cached.promise =
    cached.promise || mongoose.connect(MONGODB_URI, { bufferCommands: false });

  cached.conn = await cached.promise;
  return cached.conn;
}
